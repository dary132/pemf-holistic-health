"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, themes } from "@/lib/themes";

/* The applied theme lives on the document, not in React.
 *
 * It has to: an inline script in app/layout.tsx sets data-theme before paint,
 * long before this component exists, so React is a late arrival to state that
 * is already correct. Mirroring it into useState and syncing with an effect
 * inverts that -- it makes React the owner of something it does not own, needs
 * a setState inside an effect to catch up, and trips both the
 * react-hooks/set-state-in-effect and react-hooks/immutability rules for good
 * reason rather than by accident.
 *
 * useSyncExternalStore is the API for exactly this shape: read an external
 * system, render an SSR-safe snapshot, re-render when it changes. It also
 * removes the hydration problem instead of suppressing it -- React renders
 * getServerSnapshot() during hydration and only then re-reads the live DOM, so
 * server and client markup always agree at the moment they are compared.
 *
 * The mutation lives in applyTheme, a module function outside the component,
 * which is both where the immutability rule wants it and where it belongs:
 * writing to the document is this store's job, not the view's. */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** "" is the default palette: it is the bare :root block, which needs no
 *  attribute, so an absent data-theme and the default theme are the same
 *  state rather than "unset". */
function getSnapshot() {
  return document.documentElement.dataset.theme ?? "";
}

function getServerSnapshot() {
  return "";
}

function applyTheme(id: string) {
  const root = document.documentElement;
  if (id) root.dataset.theme = id;
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
    // Safari in private mode throws on setItem. The theme is already on the
    // document by this point, so losing only the persistence is the right
    // degradation -- the client still sees the palette they clicked.
  }
  for (const onChange of listeners) onChange();
}

/** The palette picker on /themes. Radios rather than buttons: this is one
 *  choice from a fixed set, so the native control already carries the roving
 *  focus, arrow-key movement and "3 of 4" announcement that a div with an
 *  onClick would have to reinvent, usually worse. */
export function ThemeSwitcher() {
  const active = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <fieldset className="border-0 p-0">
      <legend className="sr-only">Colour theme</legend>
      <div className="grid gap-5 sm:grid-cols-2">
        {themes.map((t) => {
          const checked = active === t.id;
          return (
            <label
              key={t.id || "default"}
              className={`u-plate flex cursor-pointer gap-4 p-5 ${
                checked ? "outline outline-[3px] outline-offset-2 outline-clay" : ""
              }`}
            >
              <input
                type="radio"
                name="theme"
                value={t.id}
                checked={checked}
                onChange={() => applyTheme(t.id)}
                className="mt-1.5 h-5 w-5 shrink-0 accent-clay"
              />
              <span className="block">
                <span className="block text-lg font-bold text-ink">{t.name}</span>
                {/* Swatches are decorative: the theme name beside them is the
                    accessible label, so announcing three unnamed colours would
                    only add noise to the radio's own announcement. */}
                <span aria-hidden="true" className="mt-2 flex gap-1.5">
                  {t.swatch.map((hex) => (
                    <span
                      key={hex}
                      className="h-7 w-7 rounded-full border border-black/15"
                      style={{ background: hex }}
                    />
                  ))}
                </span>
                <span className="mt-2 block text-ink-soft">{t.tagline}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
