import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0A1628" }} className="text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-fredoka)",
                color: "#00AAFF",
                textShadow: "2px 2px 0px #FFD700",
              }}
            >
              Whacko&apos;s Wash
            </h3>
            <p className="text-gray-400 text-sm">
              Kid-Powered Sparkle for Your Car!
            </p>
            <p className="text-gray-400 text-sm mt-1">Portland, Oregon</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-3" style={{ color: "#FFD700" }}>
              Quick Links
            </h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors">Services</Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3" style={{ color: "#FFD700" }}>
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📧 hello@whackoswash.com</p>
              <p>📱 (503) 555-WASH</p>
              <p>📍 Portland, OR</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Whacko&apos;s Wash. All rights reserved. Built with sparkle.
        </div>
      </div>
    </footer>
  );
}
