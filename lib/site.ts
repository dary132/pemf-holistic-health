export const site = {
  name: "PEMF for Holistic Health",
  officePhone: "(949) 891 5572",
  officePhoneHref: "tel:+19498915572",
  url: "https://pemfforholistichealth.com",
  areaServed: "Orange County, California",
  phone: "(949) 891 5572",
  phoneHref: "tel:+19498915572",
  whatsapp: "(949) 891 5572",
  whatsappHref: "https://wa.me/19498915572",
  address: ["22706 Aspan St, Suite 504", "Lake Forest, CA 92630"],
  // Google Maps *directions* (`/maps/dir/?api=1&destination=`), not a pin
  // (`/maps?q=`) as app/contact/page.tsx embeds. The distinction is the whole
  // point of the button: a pin shows the visitor where the office is, a
  // directions link opens their phone's navigation already routed there from
  // wherever they are standing. Never rendered as text -- see
  // SITE_NON_COPY_KEYS in scripts/verify-copy.mjs.
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=22706+Aspan+St+Suite+504+Lake+Forest+CA+92630",
  disclaimer:
    "This information is intended for educational purposes only and should not be taken as medical advice. Always consult with a qualified professional before making any decisions related to your health or wellness plan.",
  // NOT in the 2026 document (docs/exiga-jasmin-2026*.txt) at all. This is
  // protective language carried over from the prior build. Removing a safety
  // disclaimer without the client's explicit instruction is the riskier
  // action, so it is being flagged for client sign-off rather than deleted
  // or silently kept as if it were verified copy. See scripts/verify-copy.mjs
  // SITE_EXEMPT for the matching guard exemption. Deliberate, pending exception.
  deviceNote:
    "The PEMF system is not a medical device and is not intended to diagnose, cure, mitigate, prevent or treat any disease.",
};
