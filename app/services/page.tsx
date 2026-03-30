import Link from "next/link";
import WaveDivider from "../components/WaveDivider";

const services = [
  {
    emoji: "🚿",
    name: "Basic Exterior Wash",
    price: "$25",
    desc: "Soap, rinse, dry. Your car back to its happy place.",
    gradient: "linear-gradient(135deg, #00AAFF, #0A1628)",
  },
  {
    emoji: "🧹",
    name: "Interior Vacuum & Wipe",
    price: "$30",
    desc: "No crumb left behind. Seriously.",
    gradient: "linear-gradient(135deg, #7FE000, #00AAFF)",
  },
  {
    emoji: "🔍",
    name: "Full Interior Detail",
    price: "$60",
    desc: "Every surface, every corner, every forgotten french fry.",
    gradient: "linear-gradient(135deg, #FFD700, #FF3333)",
  },
  {
    emoji: "🚗",
    name: "Exterior + Interior Combo",
    price: "$75",
    desc: "The full Whacko experience. In and out.",
    gradient: "linear-gradient(135deg, #FF3333, #FFD700)",
  },
  {
    emoji: "🌟",
    name: "Complete Sparkle Package",
    price: "$100",
    desc: "Our best. Wax, detail, the works. Your car will thank you.",
    gradient: "linear-gradient(135deg, #0A1628, #7FE000)",
  },
  {
    emoji: "🚐",
    name: "Fleet / Multiple Cars",
    price: "Call for pricing",
    desc: "Got more than one? Let's talk.",
    gradient: "linear-gradient(135deg, #00AAFF, #7FE000)",
  },
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center"
        style={{
          background: "linear-gradient(135deg, #7FE000 0%, #00AAFF 100%)",
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
            What We Do 🧽
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90">
            Pick your level of sparkle
          </p>
        </div>
        <div className="mt-12" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="fun-card text-white shadow-lg flex flex-col"
                style={{ background: svc.gradient }}
              >
                <div className="text-5xl mb-4">{svc.emoji}</div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {svc.name}
                </h3>
                <p className="opacity-90 mb-4 flex-1">{svc.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {svc.price}
                  </span>
                  <Link
                    href="/contact"
                    className="cta-button text-sm !py-2 !px-5"
                  >
                    Book It
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#FFFFFF" to="#0A1628" />

      {/* Bottom CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: "#0A1628" }}>
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4 text-white"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Not sure which service is right? 🤷
        </h2>
        <p className="text-gray-400 mb-6">
          Just reach out and we will figure it out together!
        </p>
        <Link href="/contact" className="cta-button text-lg">
          Get in Touch
        </Link>
      </section>
    </>
  );
}
