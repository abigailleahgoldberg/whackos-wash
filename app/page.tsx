import Image from "next/image";
import Link from "next/link";
import WaveDivider from "./components/WaveDivider";

const services = [
  {
    emoji: "🚿",
    name: "Exterior Wash",
    desc: "Soap, rinse, and shine. Your ride, refreshed.",
    price: "$25",
    color: "#00AAFF",
  },
  {
    emoji: "✨",
    name: "Full Interior Detail",
    desc: "Inside and out, every inch gets the Whacko treatment.",
    price: "$60",
    color: "#7FE000",
  },
  {
    emoji: "🌟",
    name: "Sparkle Package",
    desc: "The ultimate. Wax, detail, everything. Your car will glow.",
    price: "$100",
    color: "#FFD700",
  },
];

const trustStats = [
  { emoji: "💪", label: "100% Kid Powered" },
  { emoji: "📍", label: "Klamath Falls Born" },
  { emoji: "🔥", label: "Zero Shortcuts" },
  { emoji: "😄", label: "Smile Guaranteed" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #00AAFF 100%)",
        }}
      >
        {/* Background image */}
        <Image
          src="/wavy-graphic.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />

        {/* Bubbles */}
        <div className="bubble" style={{ width: 40, height: 40, left: "10%", bottom: "10%", animationDuration: "8s", animationDelay: "0s" }} />
        <div className="bubble" style={{ width: 20, height: 20, left: "25%", bottom: "5%", animationDuration: "12s", animationDelay: "2s" }} />
        <div className="bubble" style={{ width: 60, height: 60, left: "50%", bottom: "15%", animationDuration: "10s", animationDelay: "1s" }} />
        <div className="bubble" style={{ width: 30, height: 30, left: "70%", bottom: "8%", animationDuration: "9s", animationDelay: "3s" }} />
        <div className="bubble" style={{ width: 50, height: 50, left: "85%", bottom: "12%", animationDuration: "11s", animationDelay: "0.5s" }} />
        <div className="bubble" style={{ width: 25, height: 25, left: "40%", bottom: "20%", animationDuration: "7s", animationDelay: "4s" }} />
        <div className="bubble" style={{ width: 35, height: 35, left: "60%", bottom: "3%", animationDuration: "13s", animationDelay: "1.5s" }} />
        <div className="bubble" style={{ width: 45, height: 45, left: "15%", bottom: "25%", animationDuration: "9.5s", animationDelay: "2.5s" }} />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#00AAFF",
              textShadow:
                "4px 4px 0px #FFD700, 6px 6px 0px rgba(0,0,0,0.2)",
            }}
          >
            WHACKO&apos;S WASH
          </h1>
          <p
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-8"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FFD700",
            }}
          >
            Kid-Powered Sparkle for Your Car!
          </p>
          <Link href="/contact" className="cta-button text-lg sm:text-xl">
            Book Your Wash Now!
          </Link>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-4 overflow-hidden" style={{ backgroundColor: "#FFD700" }}>
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-center">
          {[
            "Kid Entrepreneur",
            "Super Fun",
            "Super Clean",
            "Klamath Falls Local",
          ].map((item, i) => (
            <span
              key={i}
              className="text-sm sm:text-base font-bold whitespace-nowrap"
              style={{ color: "#0A1628", fontFamily: "var(--font-fredoka)" }}
            >
              {i > 0 && <span className="sparkle-anim inline-block mr-4">✨</span>}
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 relative">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#0A1628",
            }}
          >
            Hi, I&apos;m Whacko! 👋
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "#333" }}>
            At just 12 years old I started Whacko&apos;s Wash right here in Klamath Falls,
            Oregon because I love making cars shine! Every wash gets the full Whacko
            treatment: serious scrubbing, serious sparkle. Your car is in good hands.
          </p>
        </div>
        {/* Subtle bubble decorations */}
        <div
          className="absolute top-10 right-10 w-16 h-16 rounded-full float-anim opacity-20"
          style={{ background: "radial-gradient(circle, #00AAFF, transparent)" }}
        />
        <div
          className="absolute bottom-10 left-10 w-24 h-24 rounded-full float-slow opacity-15"
          style={{ background: "radial-gradient(circle, #7FE000, transparent)" }}
        />
      </section>

      <WaveDivider from="#FFFFFF" to="#F0F8FF" />

      {/* Services preview */}
      <section className="py-20" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
          >
            Our Services 🚗
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="fun-card bg-white shadow-lg text-center"
                style={{ borderTop: `6px solid ${svc.color}` }}
              >
                <div className="text-5xl mb-4">{svc.emoji}</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
                >
                  {svc.name}
                </h3>
                <p className="text-gray-600 mb-4">{svc.desc}</p>
                <p
                  className="text-2xl font-bold mb-4"
                  style={{ color: svc.color }}
                >
                  From {svc.price}
                </p>
                <Link href="/contact" className="cta-button text-sm !py-2 !px-6">
                  Book It
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#F0F8FF" to="#FFFFFF" flip />

      {/* Why Whacko */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
          >
            Why Whacko? 🤔
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((stat, i) => {
              const colors = ["#00AAFF", "#7FE000", "#FF3333", "#FFD700"];
              return (
                <div
                  key={i}
                  className="fun-card text-center text-white"
                  style={{ backgroundColor: colors[i % colors.length] }}
                >
                  <div className="text-4xl mb-3 float-anim">{stat.emoji}</div>
                  <p
                    className="font-bold text-sm sm:text-base"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #00AAFF 0%, #7FE000 100%)",
        }}
      >
        <div className="relative z-10 text-center px-4">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white"
            style={{
              fontFamily: "var(--font-fredoka)",
              textShadow: "2px 2px 0px rgba(0,0,0,0.2)",
            }}
          >
            Ready to get Whacko clean? 🧽
          </h2>
          <Link href="/contact" className="cta-button text-lg">
            Book Your Wash!
          </Link>
        </div>
        {/* Decorative bubbles */}
        <div
          className="absolute top-5 left-[10%] w-20 h-20 rounded-full opacity-20 float-anim"
          style={{ backgroundColor: "white" }}
        />
        <div
          className="absolute bottom-5 right-[15%] w-14 h-14 rounded-full opacity-20 float-slow"
          style={{ backgroundColor: "white" }}
        />
      </section>
    </>
  );
}
