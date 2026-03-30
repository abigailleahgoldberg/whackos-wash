"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
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
        {/* Decorative bubbles */}
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
            Let&apos;s Make Your Car Whacko-Clean! 🚗
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90">
            Fill out the form below and we will get back to you fast
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
                  Thanks! We&apos;ll be in touch!
                </h2>
                <p className="text-gray-600">
                  We will text or call you back within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="What should we call you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="(503) 555-1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>
                    Car Type / Size
                  </label>
                  <input
                    type="text"
                    name="carType"
                    value={form.carType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="e.g. Honda Civic, Toyota 4Runner"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>
                    Service Wanted
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors bg-white"
                  >
                    <option value="">Pick a service...</option>
                    <option value="exterior">Basic Exterior Wash - $25</option>
                    <option value="interior">Interior Vacuum & Wipe - $30</option>
                    <option value="full-interior">Full Interior Detail - $60</option>
                    <option value="combo">Exterior + Interior Combo - $75</option>
                    <option value="sparkle">Complete Sparkle Package - $100</option>
                    <option value="fleet">Fleet / Multiple Cars</option>
                    <option value="other">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1" style={{ color: "#0A1628" }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    placeholder="Anything else we should know?"
                  />
                </div>
                <button type="submit" className="cta-button w-full text-center text-lg">
                  Send It! 🚀
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
              >
                Other Ways to Reach Us
              </h2>
              <div className="space-y-4">
                <div className="fun-card bg-blue-50 flex items-center gap-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <p className="font-bold" style={{ color: "#0A1628" }}>Text or Call</p>
                    <p className="text-gray-600">(503) 555-WASH</p>
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
                    <p className="text-gray-600">Portland, Oregon (we come to you!)</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="fun-card text-center"
              style={{ background: "linear-gradient(135deg, #FFD700, #FF3333)" }}
            >
              <div className="text-4xl mb-3 float-anim">⏰</div>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-fredoka)" }}>
                We&apos;ll text or call you back within 24 hours!
              </p>
            </div>

            {/* Bubble decorations */}
            <div className="relative h-32">
              <div
                className="absolute top-0 left-[20%] w-12 h-12 rounded-full float-anim opacity-30"
                style={{ background: "radial-gradient(circle, #00AAFF, transparent)" }}
              />
              <div
                className="absolute top-8 left-[60%] w-8 h-8 rounded-full float-slow opacity-20"
                style={{ background: "radial-gradient(circle, #7FE000, transparent)" }}
              />
              <div
                className="absolute top-4 left-[40%] w-16 h-16 rounded-full float-anim opacity-25"
                style={{ background: "radial-gradient(circle, #FFD700, transparent)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
