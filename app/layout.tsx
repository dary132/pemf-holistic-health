import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { localBusinessSchema, websiteSchema } from "@/lib/seo";

const display = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Lake Forest, CA`,
    template: `%s | ${site.name}`,
  },
  description: "Try adding a holistic approach by laying on the PEMF body mat.",
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sage focus:px-6 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
