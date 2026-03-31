import type { Metadata } from "next";
import Link from "next/link";
import WaveDivider from "../components/WaveDivider";

export const metadata: Metadata = {
  title: "About Whacko | Kid Entrepreneur Car Wash Klamath Falls",
  description:
    "Meet Whacko — a 15-year-old Klamath Falls entrepreneur who started his own car washing business. Real hustle, real sparkle.",
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #00AAFF 100%)",
        }}
      >
        <div className="relative z-10 px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka)",
              color: "#FFD700",
              textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
            }}
          >
            Meet Whacko! 🧒
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90">
            The kid behind the cleanest cars in Klamath Falls
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <div
            className="fun-card flex flex-col items-center justify-center h-80"
            style={{
              background: "linear-gradient(135deg, #00AAFF 0%, #7FE000 100%)",
            }}
          >
            <div className="text-8xl mb-4 float-anim">🚗</div>
            <p
              className="text-white font-bold text-lg"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              That&apos;s me with my bucket!
            </p>
          </div>

          {/* Story text */}
          <div>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
            >
              The Whacko Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                I&apos;m 15 years old, and I live right here in Klamath Falls, Oregon. Ever
                since I was little, I loved washing my parents&apos; cars. Something about
                seeing a dirty car turn shiny and new just makes me happy.
              </p>
              <p>
                One day I thought: why not wash other people&apos;s cars too? So I grabbed
                a bucket, some soap, and a sponge, and Whacko&apos;s Wash was born.
              </p>
              <p>
                You bring your car to me right here in Klamath Falls (I can&apos;t drive yet!), but
                every single bit of the washing, scrubbing, and detailing? That&apos;s
                all me. I treat every car like it&apos;s a Ferrari.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider from="#FFFFFF" to="#FFF8E1" />

      {/* My Promise */}
      <section className="py-20" style={{ backgroundColor: "#FFF8E1" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-8"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
          >
            My Promise to You 🤝
          </h2>
          <div className="space-y-4">
            {[
              { emoji: "🧼", text: "Every car gets hand-washed with care" },
              { emoji: "💯", text: "I never cut corners" },
              { emoji: "😊", text: "I show up with a smile every single time" },
              { emoji: "🌱", text: "I use eco-friendly products whenever possible" },
              { emoji: "💬", text: "If you are not happy, I will make it right" },
              { emoji: "⏰", text: "I text back within 24 hours, guaranteed" },
            ].map((item, i) => (
              <div
                key={i}
                className="fun-card bg-white flex items-center gap-4 shadow-sm"
              >
                <span className="text-3xl">{item.emoji}</span>
                <p className="text-gray-700 font-semibold">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#FFF8E1" to="#FFFFFF" flip />

      {/* CTA */}
      <section className="py-16 text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
        >
          Ready to let Whacko work his magic? ✨
        </h2>
        <Link href="/contact" className="cta-button text-lg">
          Book a Wash!
        </Link>
      </section>
    </>
  );
}
