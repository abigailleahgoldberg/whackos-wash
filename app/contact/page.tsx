"use client";

import Script from "next/script";

export default function Contact() {
  return (
    <>
      {/* Google Calendar scheduling CSS */}
      <link
        href="https://calendar.google.com/calendar/scheduling-button-script.css"
        rel="stylesheet"
      />

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
            Pick a time that works for you — it goes straight to our calendar
          </p>
        </div>
        <div className="mt-12" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Booking section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Booking CTA */}
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="text-6xl">📅</div>
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
            >
              Book Your Wash
            </h2>
            <p className="text-lg text-gray-600 max-w-sm">
              Click the button below to pick your date and time. You&apos;ll get a confirmation straight to your email!
            </p>

            {/* Google Calendar Scheduling Button */}
            <div id="booking-button-target" className="mt-4" />
            <Script
              src="https://calendar.google.com/calendar/scheduling-button-script.js"
              strategy="lazyOnload"
              onLoad={() => {
                const target = document.getElementById("booking-button-target");
                if (target && (window as unknown as Record<string, unknown>).calendar) {
                  ((window as unknown as Record<string, { load: (opts: unknown) => void }>).calendar).schedulingButton.load({
                    url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0uxFQX4ffXm3eY8ByKbNd6n92EQ7bSQEUzxFuY4iI9mmsSvktBTLsaDIc09e55yDKaTI4xEXoL?gv=true",
                    color: "#00AAFF",
                    label: "Book Your Wash!",
                    target,
                  });
                }
              }}
            />

            {/* Fallback direct link */}
            <a
              href="https://calendar.app.google/BFwYjXiGc6sJ1L4b6"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button text-lg"
              style={{ display: "inline-block" }}
            >
              📅 Open Booking Calendar
            </a>

            <p className="text-sm text-gray-400">
              Opens Google Calendar — works on any phone or computer
            </p>
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
                    <p className="text-gray-600">(541) 555-WASH</p>
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
              <div className="text-4xl mb-3">⚡</div>
              <p className="text-white font-bold" style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.1rem" }}>
                Book now and get a confirmation instantly!
              </p>
              <p className="text-white text-sm mt-1 opacity-90">
                Real-time availability. No waiting on a callback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
