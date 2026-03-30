import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Whacko's Wash — Real Work, Real Results",
  description:
    "See Whacko in action. Real before and after photos from car detailing jobs in Klamath Falls, Oregon. This is what kid-powered sparkle looks like.",
};

const actionShots = [
  {
    src: "/gallery/action-vacuuming.png",
    alt: "Whacko deep cleaning the interior with a wet/dry vac",
    caption: "Full interior teardown — mats out, vacuum running, nothing gets missed",
  },
  {
    src: "/gallery/action-foam-wash.png",
    alt: "Whacko applying foam to the exterior",
    caption: "Foam bath — every panel gets soaked before the rinse",
  },
  {
    src: "/gallery/action-pressure-wash.png",
    alt: "Whacko pressure washing the wheels",
    caption: "Wheels and arches get the pressure washer treatment every time",
  },
];

const beforeAfter = [
  {
    before: { src: "/gallery/before-door-panel.png", alt: "Dirty door panel before cleaning" },
    after: null,
    label: "Door Panel Deep Clean",
    desc: "Dusty trim, dirty crevices — cleaned and detailed back to like-new.",
  },
  {
    before: { src: "/gallery/before-carpet.png", alt: "Dirty carpet before vacuuming" },
    after: { src: "/gallery/after-carpet.png", alt: "Clean carpet after vacuuming" },
    label: "Carpet Before & After",
    desc: "That carpet had years of grime in it. One session with Whacko fixed that.",
  },
];

const finishedCars = [
  {
    src: "/gallery/after-subaru-side.png",
    alt: "Subaru Legacy fully detailed, side view",
    caption: "Subaru Legacy — full exterior detail. That shine is real.",
  },
  {
    src: "/gallery/after-subaru-rear.png",
    alt: "Subaru Legacy fully detailed, rear quarter view",
    caption: "Every panel, every wheel — Whacko doesn't miss a spot.",
  },
];

export default function Gallery() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #00AAFF 100%)" }}
      >
        <div className="bubble" style={{ width: 40, height: 40, left: "8%", bottom: "20%", animationDuration: "9s" }} />
        <div className="bubble" style={{ width: 25, height: 25, left: "75%", bottom: "15%", animationDuration: "12s", animationDelay: "1s" }} />
        <div className="relative z-10 px-4">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka)", color: "#FFD700", textShadow: "3px 3px 0px rgba(0,0,0,0.3)" }}
          >
            Real Work. Real Results. 📸
          </h1>
          <p className="text-lg sm:text-xl text-white opacity-90 max-w-2xl mx-auto">
            No stock photos. No tricks. Just Whacko doing the work and the cars to prove it.
          </p>
        </div>
        <div className="mt-12" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>
      </section>

      {/* Finished Cars */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
          >
            The Finished Product ✨
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">This is what your car looks like when Whacko&apos;s done with it.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {finishedCars.map((photo) => (
              <div key={photo.src} className="fun-card overflow-hidden p-0 group">
                <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-gray-700 font-medium" style={{ fontFamily: "var(--font-fredoka)", fontSize: "1.05rem" }}>
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
          >
            Before & After 🔄
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">The proof is in the detail work.</p>
          <div className="space-y-16">
            {beforeAfter.map((item) => (
              <div key={item.label}>
                <h3
                  className="text-2xl font-bold text-center mb-6"
                  style={{ fontFamily: "var(--font-fredoka)", color: "#00AAFF" }}
                >
                  {item.label}
                </h3>
                <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">{item.desc}</p>
                <div className={`grid gap-6 ${item.after ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}>
                  <div className="fun-card overflow-hidden p-0">
                    <div className="bg-red-500 text-white text-center py-2 font-bold text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>
                      BEFORE
                    </div>
                    <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={item.before.src}
                        alt={item.before.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  {item.after && (
                    <div className="fun-card overflow-hidden p-0">
                      <div className="text-white text-center py-2 font-bold text-sm" style={{ fontFamily: "var(--font-fredoka)", backgroundColor: "#7FE000" }}>
                        AFTER ✨
                      </div>
                      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                        <Image
                          src={item.after.src}
                          alt={item.after.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Shots */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-4"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0A1628" }}
          >
            Whacko at Work 💪
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">No shortcuts. No skipped spots. This is what a proper wash looks like.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actionShots.map((photo) => (
              <div key={photo.src} className="fun-card overflow-hidden p-0 group">
                <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-gray-700 text-sm font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #00AAFF 0%, #7FE000 100%)" }}
      >
        <div className="relative z-10 px-4">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: "var(--font-fredoka)", textShadow: "2px 2px 0px rgba(0,0,0,0.2)" }}
          >
            Want results like these? 🚗
          </h2>
          <p className="text-white opacity-90 mb-8 text-lg">Book your wash online in 60 seconds. We come to you.</p>
          <Link href="/contact" className="cta-button text-lg">
            Book Your Wash Now!
          </Link>
        </div>
      </section>
    </>
  );
}
