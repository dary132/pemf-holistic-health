import { site } from "@/lib/site";

/** The office number as a call button. 56px tall, everywhere on the site. */
export function PhoneButton({
  variant = "solid",
}: {
  variant?: "solid" | "outline" | "inverse";
}) {
  const base =
    "inline-flex min-h-[56px] items-center justify-center rounded-full px-8 text-lg font-bold no-underline";
  /* `inverse` exists because --band is now the same magenta as --button. The
     solid variant on that band measures 1.00:1 against it -- a magenta button
     on a magenta panel, invisible. White fill with magenta text separates from
     the band at 8.59:1 and keeps the label itself AAA at the same ratio. Use
     it anywhere this button sits on a --band surface. */
  const skin =
    variant === "solid"
      ? "bg-button text-button-ink hover:bg-button-hover"
      : variant === "inverse"
        ? "bg-white text-button hover:bg-sand"
        : "border-[3px] border-button text-button hover:bg-sand";
  return (
    <a href={site.officePhoneHref} className={`${base} ${skin}`}>
      Call {site.officePhone}
    </a>
  );
}
