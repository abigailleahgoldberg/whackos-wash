import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Whacko's Wash | Kid-Powered Car Detailing Klamath Falls Oregon",
  description:
    "Whacko's Wash — Klamath Falls' most fun car detailing service, run by a 12-year-old entrepreneur! Exterior wash from $25, full detail, Sparkle Package. Book online now!",
  keywords:
    "whackos wash, car detailing klamath falls, kids car wash klamath falls, fun car cleaning klamath falls, car wash klamath falls oregon, mobile car wash klamath falls, affordable car detail oregon",
  metadataBase: new URL("https://whackoswash.com"),
  alternates: {
    canonical: "https://whackoswash.com",
  },
  openGraph: {
    title: "Whacko's Wash | Kid-Powered Car Detailing",
    description:
      "A 12-year-old entrepreneur in Klamath Falls washing cars and making them sparkle. Book your wash online!",
    url: "https://whackoswash.com",
    siteName: "Whacko's Wash",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Whacko's Wash | Kid-Powered Car Detailing",
    description:
      "A 12-year-old entrepreneur in Klamath Falls washing cars and making them sparkle. Book your wash online!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navigation />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
