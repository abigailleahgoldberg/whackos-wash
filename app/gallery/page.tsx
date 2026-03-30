import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Whacko's Wash — Before & After Car Detailing",
  description:
    "See the results. Before and after photos of Whacko's car washing and detailing work in Klamath Falls, Oregon.",
};

const placeholders = [
  { label: "Before", color: "#FF3333", emoji: "🚗" },
  { label: "After", color: "#7FE000", emoji: "✨" },
  { label: "Before", color: "#00AAFF", emoji: "🚙" },
  { label: "After", color: "#FFD700", emoji: "🌟" },
  { label: "Before", color: "#0A1628", emoji: "🚕" },
  { label: "After", color: "#7FE000", emoji: "💎" },
];

export default function Gallery() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #FFD700 0%, #FF3333 100%)",
        }}
      >
        <div className="px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FFFFFF",
              textShadow: "3px 3px 0px rgba(0,0,0,0.2)",
            }}
          >
            The Proof is in the Shine 📸
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90">
            Check out our before and after gallery
          </p>
        </div>
        <div className="mt-12" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholders.map((item, i) => (
              <div
                key={i}
                className="fun-card flex flex-col items-center justify-center h-64 shadow-lg relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)`,
                  border: `3px solid ${item.color}`,
                }}
              >
                <div className="text-6xl mb-4 float-anim">{item.emoji}</div>
                <span
                  className="text-lg font-bold px-4 py-1 rounded-full text-white"
                  style={{
                    backgroundColor: item.color,
                    fontFamily: "var(--font-fredoka)",
                  }}
                >
                  {item.label}
                </span>
                <p className="text-gray-500 text-sm mt-3">Photo coming soon!</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-lg mb-6">
              More photos coming as we wash more cars! 🚀
            </p>
            <Link href="/contact" className="cta-button text-lg">
              Be Our Next Transformation!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
