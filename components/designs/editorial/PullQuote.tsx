/** A sentence lifted from the body copy and set at display size between
 *  sections. The repetition is the device and is deliberate: this sentence
 *  also appears inside the Holistic Approach paragraphs. The spec flags it
 *  because it WILL read as duplication to anyone not expecting it -- say so
 *  when showing the client, do not quietly drop it. */
export function PullQuote({ text }: { text: string }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 py-16">
        <blockquote className="mx-auto max-w-[24ch] text-center font-[family-name:var(--font-display)] text-4xl leading-tight text-sage sm:text-5xl">
          {text}
        </blockquote>
      </div>
    </section>
  );
}
