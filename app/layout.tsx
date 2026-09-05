import type { Metadata } from "next";
import { Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CallPopup } from "@/components/CallPopup";
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

/* Applies the stored theme to <html> before first paint.
 *
 * This has to be an inline, render-blocking script: the theme lives in
 * localStorage, which the server cannot read, so a themed visitor would
 * otherwise get a frame of the default palette before React hydrated and
 * corrected it -- a full-page colour flash on every navigation.
 *
 * It cannot import THEME_STORAGE_KEY from lib/themes.ts either, because it is
 * stringified into the document head and runs before any bundle loads. The
 * literal below is the one duplicated spelling; lib/themes.ts says so too.
 *
 * The try/catch is load-bearing: localStorage throws on access (not just on
 * write) in some privacy modes, and an uncaught throw here would happen before
 * anything else on the page.
 *
 * It also arms the scroll reveal. Adding `.js-reveal` here rather than in the
 * React component is what avoids a flash: the hiding rule is in effect at
 * first paint, so content never appears and then jumps out again. The failsafe
 * timer is the other half of that bargain -- if the bundle never executes, the
 * class comes off by itself and the page is fully readable a few seconds in
 * rather than permanently blank below the hero. components/RevealOnScroll.tsx
 * clears the timer to say it arrived. Both statements sit OUTSIDE the try above
 * on purpose: a localStorage throw must not take the reveal down with it.
 *
 * `?theme=ocean` wins over the stored value and then becomes the stored value,
 * so a single link both shows a theme and makes it stick while the recipient
 * clicks around. `?theme=` with no value is how you get back to the default.
 *
 * On dangerouslySetInnerHTML: the payload is this frozen module-level literal
 * and nothing else. No request data, no props, no user input reaches it, so
 * there is no injection surface -- it is the only way to get a script to run
 * before paint, and sanitising a constant would sanitise nothing. The values it
 * reads back -- from localStorage, and now from the query string, which IS
 * attacker-controllable -- are pattern-checked and then written to a data
 * attribute rather than to markup, so the worst a crafted link can do is name
 * a theme that has no stylesheet block and change nothing. */
const NO_FLASH_THEME = `try{var p=new URLSearchParams(location.search).get("theme");var t=p!==null?p:localStorage.getItem("pemf-theme");if(p!==null)localStorage.setItem("pemf-theme",p);if(t&&/^[a-z-]{1,12}$/.test(t))document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add("js-reveal");window.__revealFailsafe=setTimeout(function(){document.documentElement.classList.remove("js-reveal")},4000);`;

/* suppressHydrationWarning below is required and is not papering over a bug:
   NO_FLASH_THEME deliberately sets data-theme on the root element before React
   hydrates, so the server markup (no attribute) and the live DOM (attribute
   present) are guaranteed to differ. That difference is the whole point -- it
   is what stops the colour flash. Without the prop, React logs a hydration
   mismatch on every themed page load. It suppresses one level only, so a real
   mismatch further down the tree is still reported.
   Two things keep this comment out of trouble with scripts/verify-jsx-copy.mjs,
   which extracts client-facing copy with a regex rather than a parser: it lives
   outside the returned JSX, and it spells out "root element" instead of using
   angle brackets. Bracketed tag names in a comment read to that extractor as
   real JSX, and the prose between them gets checked against the client
   document -- which it will never match. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sage focus:px-6 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <RevealOnScroll />
        {/* Every page: the 30-second call prompt, once per session. See the
            component for why it is worded with the CTA block's copy. */}
        <CallPopup />
        <Footer />
        <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
