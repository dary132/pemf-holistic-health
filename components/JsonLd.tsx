/**
 * Renders structured data as a JSON-LD script tag.
 *
 * `dangerouslySetInnerHTML` is required here: a script tag's contents cannot be set
 * through React children, and this is the pattern the Next.js JSON-LD guide prescribes.
 * Two things keep it safe, and both must stay true:
 *
 * 1. Every caller passes statically authored data from `lib/` or `lib/content/`.
 *    No request input, no URL parameter, and no user-submitted value reaches this
 *    component. If that ever changes, this component needs a real sanitiser.
 * 2. `JSON.stringify` does not escape sequences that break out of a script tag, so
 *    the opening angle bracket is replaced with its JSON unicode escape. That makes
 *    a payload such as `</script><script>` inert while keeping the JSON valid.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
