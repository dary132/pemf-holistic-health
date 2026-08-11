import type { Metadata } from "next";
import { Marcellus, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const display = Marcellus({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | Lake Forest, CA`,
  description:
    "PEMF — a holistic approach to health and wellness. Whole-body PEMF sessions for energy, sleep, relaxation, sports performance, and pets. Office and home visits available in Lake Forest, CA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
