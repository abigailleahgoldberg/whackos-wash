import type { Metadata } from "next";
import Link from "next/link";
import WaveDivider from "../components/WaveDivider";

export const metadata: Metadata = {
  title: "Pricing | Whacko's Wash — Affordable Car Detailing Klamath Falls",
  description:
    "Clear, honest pricing. Exterior wash $25, interior vacuum $35, full interior detail $60, Sparkle Package $100. No hidden fees. Klamath Falls, Oregon.",
};

const tiers = [
  {
    name: "Quick Clean",
    price: "$25 - $35",
    desc: "Exterior or Interior only",
    features: [
      "Exterior hand wash $25 OR Interior vacuum & wipe $35",
      "Towel dry / wipe down",
      "Quick and efficient",
      "Perfect for maintenance washes",
    ],
    color: "#00AAFF",
    emoji: "🚿",
  },
  {
    name: "Full Interior Detail",
    price: "$60",
    desc: "Full interior detail",
    features: [
      "Complete interior vacuum",
      "Dashboard and console detail",
      "Door panels and trim",
      "Windows inside and out",
    ],
    color: "#7FE000",
    emoji: "🚗",
    popular: true,
  },
  {
    name: "Sparkle Package",
    price: "$100",
    desc: "Everything + wax",
    features: [
      "Everything in Full Clean",
      "Hand wax and polish",
      "Tire and rim detail",
      "Air freshener included",
      "The ultimate Whacko experience",
    ],
    color: "#FFD700",
    emoji: "🌟",
  },
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #00AAFF 100%)",
        }}
      >
        <div className="px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FFD700",
              textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
            }}
          >
            Simple Pricing 💰
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90">
            No surprises. No hidden fees. Just sparkle.
          </p>
        </div>
        <div className="mt-12" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="fun-card bg-white shadow-lg flex flex-col text-center relative"
                style={{ borderTop: `6px solid ${tier.color}` }}
              >
                {tier.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold"
                    style={{
                      backgroundColor: tier.color,
                      fontFamily: "var(--font-fredoka)",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="text-5xl mb-4 float-anim">{tier.emoji}</div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-fredoka)",
                    color: "#0A1628",
                  }}
                >
                  {tier.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{tier.desc}</p>
                <p
                  className="text-3xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-fredoka)",
                    color: tier.color,
                  }}
                >
                  {tier.price}
                </p>
                <ul className="text-left text-gray-600 space-y-2 mb-6 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: tier.color }}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="cta-button text-sm w-full text-center">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#FFFFFF" to="#F0FFF0" />

      {/* Not sure CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "#F0FFF0" }}>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
        >
          Not sure which? 🤔
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Just text us and we will help you pick the perfect package!
        </p>
        <Link href="/contact" className="cta-button text-lg">
          Get in Touch
        </Link>
      </section>
    </>
  );
}
