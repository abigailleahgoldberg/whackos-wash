import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, carType, service, message, preferredDate } = body;

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BOOKING_EMAIL = process.env.BOOKING_EMAIL;

    // Return env var state in response for debugging
    if (!BREVO_API_KEY) {
      return NextResponse.json({ error: "BREVO_API_KEY missing" }, { status: 500 });
    }
    if (!BOOKING_EMAIL) {
      return NextResponse.json({ error: "BOOKING_EMAIL missing" }, { status: 500 });
    }

    const serviceLabels: Record<string, string> = {
      exterior: "Basic Exterior Wash - $25",
      interior: "Interior Vacuum & Wipe - $30",
      "full-interior": "Full Interior Detail - $60",
      sparkle: "Complete Sparkle Package - $100",
      fleet: "Fleet / Multiple Cars",
      other: "Not sure yet",
    };
    const serviceName = serviceLabels[service] || service;

    // Business notification
    const businessRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash Website", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: BOOKING_EMAIL, name: "Whacko's Wash" }],
        subject: `New Booking: ${name} - ${serviceName}`,
        htmlContent: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "n/a"}</p><p><strong>Car:</strong> ${carType || "n/a"}</p><p><strong>Service:</strong> ${serviceName}</p><p><strong>Date:</strong> ${preferredDate || "flexible"}</p><p><strong>Message:</strong> ${message || "none"}</p>`,
      }),
    });

    if (!businessRes.ok) {
      const errText = await businessRes.text();
      return NextResponse.json({ error: "Business email failed", detail: errText }, { status: 500 });
    }

    // Client confirmation
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: email, name: name }],
        subject: "Your Whacko's Wash Booking - We'll Confirm Soon!",
        htmlContent: `<p>Hi ${name},</p><p>We got your booking request for <strong>${serviceName}</strong> on <strong>${preferredDate || "a flexible date"}</strong>.</p><p>We'll text or call you within 24 hours to confirm. Questions? Text us at (888) 230-6442.</p><p>— Whacko's Wash</p>`,
      }),
    });

    return NextResponse.json({ success: true, sentTo: BOOKING_EMAIL });

  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Server error", detail: msg }, { status: 500 });
  }
}
