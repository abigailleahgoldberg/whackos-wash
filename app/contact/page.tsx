"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    service: "",
    preferredDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Oops! Something went wrong. Try texting us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00AAFF 0%, #7FE000 100%)",
        }}
      >
        <div className="bubble" style={{ width: 30, height: 30, left: "5%", bottom: "20%", animationDuration: "9s", animationDelay: "0s" }} />
        <div className="bubble" style={{ width: 50, height: 50, left: "80%", bottom: "10%", animationDuration: "11s", animationDelay: "1s" }} />
        <div className="bubble" style={{ width: 20, height: 20, left: "60%", bottom: "30%", animationDuration: "8s", animationDelay: "2s" }} />

        <div className="relative z-10 px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FFFFFF",
              textShadow: "3px 3px 0px rgba(0,0,0,0.2)",
            }}
          >
            Let&apos;s Make Your Car Whacko-Clean!
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90">
            Fill out the form and we will get back to you within 24 hours
          </p>
        </div>
        <div className="mt-12" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Form section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="fun-card text-center py-16" style={{ backgroundColor: "#F0FFF0" }}>
                <div className="text-6xl mb-4">🎉</div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-fredoka)", color: "#7FE000" }}
                >
                  Booking Request Sent!
                </h2>
                <p className="text-gray-600 mb-2">
                  We will text or call you back within 24 hours to confirm your appointment.
                </p>
                <p className="text-gray-500 text-sm">
                  Your booking details have been sent to the Whacko&apos;s Wash team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Your Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="What should we call you?" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="(541) 555-1234" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Car Type / Size</label>
                  <input type="text" name="carType" value={form.carType} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="e.g. Honda Civic, Toyota 4Runner" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Service Wanted *</label>
                  <select name="service" value={form.service} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors bg-white">
                    <option value="">Pick a service...</option>
                    <option value="exterior">Basic Exterior Wash - $25</option>
                    <option value="interior">Interior Vacuum & Wipe - $30</option>
                    <option value="full-interior">Full Interior Detail - $60</option>
                    <option value="combo">Exterior + Interior Combo - $75</option>
                    <option value="sparkle">Complete Sparkle Package - $100</option>
                    <option value="fleet">Fleet / Multiple Cars - Call for pricing</option>
                    <option value="other">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Preferred Date</label>
                  <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    min={new Date().toISOString().split("T")[0]} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    placeholder="Anything else we should know?" />
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-bold">{error}</p>
                )}
                <button type="submit" disabled={loading} className="cta-button w-full text-center text-lg" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Sending..." : "Book My Wash!"}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}>
                Other Ways to Reach Us
              </h2>
              <div className="space-y-4">
                <div className="fun-card bg-blue-50 flex items-center gap-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className="font-bold" style={{ color: "#0A1628" }}>Text or Call</p>
                    <p className="text-gray-600">(888) 230-6442</p>
                  </div>
                </div>
                <div className="fun-card bg-green-50 flex items-center gap-4">
                  <span className="text-3xl">📧</span>
                  <div>
                    <p className="font-bold" style={{ color: "#0A1628" }}>Email</p>
                    <p className="text-gray-600">hello@whackoswash.com</p>
                  </div>
                </div>
                <div className="fun-card bg-yellow-50 flex items-center gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <p className="font-bold" style={{ color: "#0A1628" }}>Location</p>
                    <p className="text-gray-600">Klamath Falls, Oregon (we come to you!)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fun-card text-center" style={{ background: "linear-gradient(135deg, #FFD700, #FF8C00)" }}>
              <div className="text-4xl mb-3">📅</div>
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.1rem" }}>
                We&apos;ll confirm your appointment within 24 hours!
              </p>
              <p className="text-white text-sm mt-1 opacity-90">
                Booking goes straight to our calendar so we stay organized.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
