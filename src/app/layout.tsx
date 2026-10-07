import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaming Consoles on Rent in Bangalore | PS5, Xbox, VR | SharePal",
  description:
    "Rent the latest gaming gadgets from PS5, Xbox, Oculus VR, Racing Wheel on rent in Bangalore. Affordable per-day rentals, doorstep delivery & pickup. Served 1 Lakh+ orders.",
  keywords: [
    "gaming gadgets on rent",
    "ps5 on rent bangalore",
    "xbox on rent",
    "vr on rent",
    "sharepal",
  ],
  openGraph: {
    title: "Gaming Consoles on Rent in Bangalore | SharePal",
    description:
      "Rent the latest gaming gadgets from PS5, Xbox, Oculus VR, Racing Wheel on rent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ubuntu.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
