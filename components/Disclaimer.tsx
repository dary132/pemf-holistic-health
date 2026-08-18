import { site } from "@/lib/site";

/** The client's disclaimer. Appears at the foot of every page, as in the document. */
export function Disclaimer() {
  return (
    <div className="bg-sage text-white">
      <div className="mx-auto max-w-6xl px-5 py-8">
        <p className="max-w-[62ch] text-base leading-relaxed">
          <strong>Disclaimer:</strong> {site.disclaimer}
        </p>
      </div>
    </div>
  );
}
