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
  title: "Whacko's Wash | Kid Car Detailing Klamath Falls Oregon",
  description:
    "Whacko's Wash is Klamath Falls' most fun car detailing service, run by a 12-year-old entrepreneur! Exterior wash, full detail, Sparkle Package. Book now!",
  keywords:
    "whackos wash, car detailing klamath falls, kids car wash klamath falls, fun car cleaning klamath falls, car wash klamath falls oregon",
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
