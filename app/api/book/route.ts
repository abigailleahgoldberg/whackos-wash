import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, carType, service, message, preferredDate } = body;

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BOOKING_EMAIL = process.env.BOOKING_EMAIL;

  if (!BREVO_API_KEY || !BOOKING_EMAIL) {
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

  // Business notification email
  const businessHtmlBody = `
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
          <p style="margin: 0; font-weight: bold; color: #0A1628;">→ Respond to ${email} to confirm</p>
        </div>
      </div>
    </div>
  `;

  // Client confirmation email
  const clientHtmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00AAFF, #7FE000); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
        <h1 style="color: white; font-size: 24px; margin: 0;">Booking Request Received! 🧼</h1>
        <p style="color: white; opacity: 0.9; margin: 8px 0 0;">Whacko's Wash</p>
      </div>
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 16px 16px; border: 2px solid #e0e0e0;">
        <p style="color: #0A1628; font-size: 16px; margin: 0 0 16px;">Hi ${name},</p>
        <p style="color: #0A1628; margin: 0 0 16px;">Thanks for booking with Whacko's Wash! We got your request:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Service</td><td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #7FE000; font-weight: 700;">${serviceName}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #666;">Preferred Date</td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${preferredDate || "Flexible"}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 600; color: #666;">Car</td><td style="padding: 8px 0;">${carType || "Not specified"}</td></tr>
        </table>
        <p style="color: #0A1628; margin: 20px 0;">We'll text or call you within 24 hours to confirm your appointment.</p>
        <p style="color: #666; margin: 20px 0 0; font-size: 14px;"><strong>Questions?</strong> Text us at <strong>(888) 230-6442</strong> or reply to this email.</p>
        <div style="margin-top: 24px; padding: 16px; background: linear-gradient(135deg, #FFD700, #FF8C00); border-radius: 12px; text-align: center;">
          <p style="margin: 0; color: white; font-weight: bold;">Looking forward to making your car shine! ✨</p>
        </div>
      </div>
    </div>
  `;

  try {
    // Send to business
    const businessRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash Website", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: BOOKING_EMAIL, name: "Whacko's Wash" }],
        subject: `New Booking: ${name} - ${serviceName}`,
        htmlContent: businessHtmlBody,
      }),
    });

    if (!businessRes.ok) {
      const err = await businessRes.text();
      console.error("Business email failed:", err);
      return NextResponse.json({ error: "Booking received but notification failed" }, { status: 500 });
    }

    // Send confirmation to customer
    const clientRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Whacko's Wash", email: "abigailleahgoldberg@gmail.com" },
        to: [{ email: email, name: name }],
        subject: "Your Whacko's Wash Booking Request - We'll Confirm Soon!",
        htmlContent: clientHtmlBody,
      }),
    });

    if (!clientRes.ok) {
      const err = await clientRes.text();
      console.error("Client email failed:", err);
      // Still success because business email went through
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
