/** In-page anchor bar for the two pages the document splits into linked sections. */
export function JumpNav({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="border-y border-rule bg-sand">
      <ul className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 py-3">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-flex min-h-[48px] items-center rounded-full px-5 font-bold text-clay underline underline-offset-4 hover:bg-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
