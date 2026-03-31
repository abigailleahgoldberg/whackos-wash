import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Build a Google Calendar "Add to Calendar" link (no auth needed, opens in browser)
function buildGoogleCalendarLink(params: {
  title: string;
  details: string;
  date: string; // YYYY-MM-DD
}): string {
  const start = params.date.replace(/-/g, "") + "T090000";
  const end = params.date.replace(/-/g, "") + "T100000";
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  return (
    base +
    `&text=${encodeURIComponent(params.title)}` +
    `&dates=${start}/${end}` +
    `&details=${encodeURIComponent(params.details)}` +
    `&location=${encodeURIComponent("Klamath Falls, Oregon")}`
  );
}

async function getGoogleAccessToken(serviceAccountJson: string): Promise<string> {
  const sa = JSON.parse(serviceAccountJson);
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  })).toString("base64url");
  const signingInput = `${header}.${payload}`;
  const { createSign } = await import("crypto");
  const sign = createSign("RSA-SHA256");
  sign.update(signingInput);
  const signature = sign.sign(sa.private_key, "base64url");
  const jwt = `${signingInput}.${signature}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenRes.json() as { access_token?: string };
  if (!tokenData.access_token) throw new Error(`Token error: ${JSON.stringify(tokenData)}`);
  return tokenData.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, carType, service, message, preferredDate } = body;

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BOOKING_EMAIL = process.env.BOOKING_EMAIL;
    const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
    const SERVICE_ACCOUNT_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!BREVO_API_KEY) return NextResponse.json({ error: "BREVO_API_KEY missing" }, { status: 500 });
    if (!BOOKING_EMAIL) return NextResponse.json({ error: "BOOKING_EMAIL missing" }, { status: 500 });

    const serviceLabels: Record<string, string> = {
      exterior: "Basic Exterior Wash - $25",
      interior: "Interior Vacuum & Wipe - $30",
      "full-interior": "Full Interior Detail - $60",
      combo: "Exterior + Interior Combo - $75",
      sparkle: "Complete Sparkle Package - $100",
      fleet: "Fleet / Multiple Cars",
      other: "Not sure yet",
    };
    const serviceName = serviceLabels[service] || service;
    const bookingDate = preferredDate || new Date(Date.now() + 86400000).toISOString().split("T")[0];

    // --- Google Calendar event (service account) ---
    let calendarEventLink = "";
    if (CALENDAR_ID && SERVICE_ACCOUNT_JSON) {
      try {
        const accessToken = await getGoogleAccessToken(SERVICE_ACCOUNT_JSON);
        const eventBody = {
          summary: `Whacko's Wash — ${name} (${serviceName})`,
          description: `Customer: ${name}\nEmail: ${email}\nPhone: ${phone || "not provided"}\nCar: ${carType || "not specified"}\nService: ${serviceName}\nMessage: ${message || "none"}`,
          start: { dateTime: `${bookingDate}T09:00:00`, timeZone: "America/Los_Angeles" },
          end: { dateTime: `${bookingDate}T10:00:00`, timeZone: "America/Los_Angeles" },
        };
        const calRes = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
            body: JSON.stringify(eventBody),
          }
        );
        const calData = await calRes.json() as { htmlLink?: string };
        calendarEventLink = calData.htmlLink || "";
      } catch (calErr) {
        console.error("Calendar error:", calErr);
      }
    }

    // "Add to My Calendar" link for the client (no auth, Google Calendar URL)
    const addToCalendarUrl = buildGoogleCalendarLink({
      title: `Car Wash — Whacko's Wash (${serviceName})`,
      details: `Service: ${serviceName}\nLocation: Klamath Falls, Oregon\nContact: (888) 230-6442 or hello@whackoswash.com`,
      date: bookingDate,
    });

    // --- Fancy client confirmation email ---
    const clientHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4;">
  <div style="background: linear-gradient(135deg, #00AAFF 0%, #7FE000 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 12px;">🚗✨</div>
    <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 800;">Booking Request Received!</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 16px;">Whacko's Wash — Klamath Falls, OR</p>
  </div>
  <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
    <p style="color: #0A1628; font-size: 17px; margin: 0 0 20px;">Hi <strong>${name}</strong>,</p>
    <p style="color: #444; margin: 0 0 24px; line-height: 1.6;">Thanks for choosing Whacko's Wash! We've received your booking request and will confirm your appointment within 24 hours.</p>

    <div style="background: #f8f9ff; border-left: 4px solid #00AAFF; border-radius: 0 12px 12px 0; padding: 20px; margin: 0 0 24px;">
      <h3 style="color: #0A1628; margin: 0 0 16px; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Booking Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #666; font-size: 14px; width: 120px;">Service</td><td style="padding: 8px 0; color: #7FE000; font-weight: 700; font-size: 15px;">${serviceName}</td></tr>
        <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Preferred Date</td><td style="padding: 8px 0; color: #0A1628; font-weight: 600;">${preferredDate || "Flexible"}</td></tr>
        <tr><td style="padding: 8px 0; color: #666; font-size: 14px;">Vehicle</td><td style="padding: 8px 0; color: #0A1628;">${carType || "Not specified"}</td></tr>
      </table>
    </div>

    <div style="text-align: center; margin: 28px 0;">
      <a href="${addToCalendarUrl}" target="_blank"
        style="display: inline-block; background: linear-gradient(135deg, #00AAFF, #7FE000); color: white; font-weight: 700; font-size: 16px; padding: 14px 32px; border-radius: 50px; text-decoration: none; box-shadow: 0 4px 15px rgba(0,170,255,0.3);">
        📅 Add to My Calendar
      </a>
    </div>

    <div style="background: linear-gradient(135deg, #FFD700, #FF8C00); border-radius: 12px; padding: 16px 20px; text-align: center; margin: 0 0 24px;">
      <p style="margin: 0; color: white; font-weight: 700; font-size: 15px;">We'll confirm within 24 hours!</p>
      <p style="margin: 6px 0 0; color: rgba(255,255,255,0.9); font-size: 13px;">We'll text or call to lock in your time slot.</p>
    </div>

    <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
      <p style="color: #888; font-size: 13px; margin: 0;">Questions? Reach us at</p>
      <p style="margin: 6px 0 0;"><a href="tel:8882306442" style="color: #00AAFF; font-weight: 700; text-decoration: none;">(888) 230-6442</a> &nbsp;·&nbsp; <a href="mailto:hello@whackoswash.com" style="color: #00AAFF; text-decoration: none;">hello@whackoswash.com</a></p>
    </div>
  </div>
  <p style="text-align: center; color: #bbb; font-size: 12px; margin: 16px 0 0;">© 2026 Whacko's Wash · Klamath Falls, Oregon</p>
</div>`;

    // --- Plain business notification email ---
    const businessHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #00AAFF, #7FE000); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h2 style="color: white; margin: 0; font-size: 22px;">New Booking Request</h2>
    <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0;">Whacko's Wash</p>
  </div>
  <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #666; width: 130px; font-size: 14px;">Name</td><td style="padding: 9px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #0A1628;">${name}</td></tr>
      <tr><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Email</td><td style="padding: 9px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #00AAFF;">${email}</a></td></tr>
      <tr><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Phone</td><td style="padding: 9px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #00AAFF;">${phone || "Not provided"}</a></td></tr>
      <tr><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Car</td><td style="padding: 9px 0; border-bottom: 1px solid #eee;">${carType || "Not specified"}</td></tr>
      <tr><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Service</td><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #7FE000; font-weight: 700;">${serviceName}</td></tr>
      <tr><td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Date</td><td style="padding: 9px 0; border-bottom: 1px solid #eee;">${preferredDate || "Flexible"}</td></tr>
      <tr><td style="padding: 9px 0; color: #666; font-size: 14px; vertical-align: top;">Message</td><td style="padding: 9px 0; color: #444;">${message || "None"}</td></tr>
    </table>
    ${calendarEventLink
      ? `<div style="margin-top: 20px; padding: 14px; background: #e8f5e9; border-radius: 8px; text-align: center;"><p style="margin: 0; color: #2e7d32; font-weight: 600;">✅ Added to Whacko's Wash Google Calendar — <a href="${calendarEventLink}" style="color: #1565c0;">View Event</a></p></div>`
      : `<div style="margin-top: 20px; padding: 14px; background: #fff3cd; border-radius: 8px; text-align: center;"><p style="margin: 0; color: #856404; font-weight: 600;">⚠️ Calendar event could not be created — add manually</p></div>`
    }
  </div>
</div>`;

    // Send business email
    const businessRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash Website", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: BOOKING_EMAIL, name: "Whacko's Wash" }],
        subject: `New Booking: ${name} - ${serviceName}`,
        htmlContent: businessHtml,
      }),
    });

    if (!businessRes.ok) {
      const err = await businessRes.text();
      return NextResponse.json({ error: "Business email failed", detail: err }, { status: 500 });
    }

    // Send fancy client confirmation
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: email, name: name }],
        subject: "Your Whacko's Wash Booking Request — We'll Confirm Soon! 🧼",
        htmlContent: clientHtml,
      }),
    });

    return NextResponse.json({ success: true, sentTo: BOOKING_EMAIL, calendarEvent: calendarEventLink || "pending" });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Server error", detail: msg }, { status: 500 });
  }
}
