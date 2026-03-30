import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, carType, service, message, preferredDate } = body;

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BOOKING_EMAIL = process.env.BOOKING_EMAIL || "timshadyeth@gmail.com";

  if (!BREVO_API_KEY) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

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

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00AAFF, #7FE000); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: white; font-size: 28px; margin: 0;">New Booking Request!</h1>
        <p style="color: white; opacity: 0.9; margin: 8px 0 0;">Whacko's Wash - Klamath Falls, OR</p>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 16px 16px; border: 2px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #0A1628; font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #00AAFF;">${email}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #00AAFF;">${phone || "Not provided"}</a></td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Car</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${carType || "Not specified"}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #7FE000; font-weight: 700;">${serviceName}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Preferred Date</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${preferredDate || "Flexible"}</td></tr>
          <tr><td style="padding: 10px 0; font-weight: bold; color: #666; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #444;">${message || "None"}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #FFD700; border-radius: 12px; text-align: center;">
          <p style="margin: 0; font-weight: bold; color: #0A1628;">Add this to the Whacko's Wash Google Calendar!</p>
        </div>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash Website", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: BOOKING_EMAIL, name: "Whacko's Wash" }],
        subject: `New Booking: ${name} - ${serviceName}`,
        htmlContent: htmlBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Brevo error:", err);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
