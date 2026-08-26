import { site } from "@/lib/site";

/** The office number as a call button. 56px tall, everywhere on the site. */
export function PhoneButton({ variant = "solid" }: { variant?: "solid" | "outline" }) {
  const base =
    "inline-flex min-h-[56px] items-center justify-center rounded-full px-8 text-lg font-bold no-underline";
  const skin =
    variant === "solid"
      ? "bg-button text-button-ink hover:bg-button-hover"
      : "border-[3px] border-button text-button hover:bg-sand";
  return (
    <a href={site.officePhoneHref} className={`${base} ${skin}`}>
      Call {site.officePhone}
    </a>
  );
}
