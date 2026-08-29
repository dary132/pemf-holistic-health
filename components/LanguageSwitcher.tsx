"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { clearTranslateCookie } from "@/lib/googtrans";

// The browser exposes no API to trigger its own translate bar, so this drives
// Google's free website-translate widget instead -- via the `googtrans` cookie
// it reads on init, not by poking at the widget's injected <select>, which
// renders asynchronously and has changed markup across widget versions.
// Picking a language sets the cookie and reloads; on any page load where the
// cookie is active, the effect below loads the widget script and it translates
// the whole page in place. Picking English clears the cookie and reloads --
// the widget's own "show original" is unreliable when driven from code.

// Native names, so a speaker can recognise their own language in the menu.
// code "" is the untranslated original. The list is the languages most spoken
// in Orange County, where the practice is.
const LANGUAGES = [
  { code: "", label: "English" },
  { code: "es", label: "Español" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ko", label: "한국어" },
  { code: "zh-CN", label: "中文（简体）" },
  { code: "zh-TW", label: "中文（繁體）" },
  { code: "tl", label: "Tagalog" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          mountId: string
        ) => unknown;
      };
    };
  }
}

function readActiveLanguage(): string {
  // Cookie value looks like "/en/es" (source/target).
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!match) return "";
  const target = decodeURIComponent(match[1]).split("/")[2] ?? "";
  return LANGUAGES.some((l) => l.code === target) ? target : "";
}

// The cookie never changes without a reload, so there is nothing to subscribe
// to -- the store exists to give the server render a stable "" snapshot while
// the client reads the cookie, without a set-state-in-effect cascade.
const subscribeToNothing = () => () => {};
const getServerLanguage = () => "";

function applyLanguage(code: string) {
  clearTranslateCookie();
  if (code) document.cookie = `googtrans=/en/${code}; path=/`;
  location.reload();
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const active = useSyncExternalStore(subscribeToNothing, readActiveLanguage, getServerLanguage);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load the widget script only when a translation is actually active, so a
  // visitor who never touches the button never loads Google's script at all.
  useEffect(() => {
    if (!active || window.google?.translate) return;
    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (TranslateElement)
        new TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGES.filter((l) => l.code)
              .map((l) => l.code)
              .join(","),
            autoDisplay: false,
          },
          "google-translate-mount"
        );
    };
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, [active]);

  // Same close behaviour as the header's wellness menu: click to open (hover
  // menus are unusable with an unsteady hand), Escape and outside click close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  const select = (code: string) => {
    if (code === active) {
      setOpen(false);
      return;
    }
    applyLanguage(code);
  };

  const activeLabel = LANGUAGES.find((l) => l.code === active)?.label;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="language-menu"
        className="inline-flex min-h-[48px] items-center gap-1.5 underline-offset-4 hover:underline"
      >
        <span aria-hidden="true">🌐</span>
        {/* notranslate: the widget must not translate the control that
            switches it, or "Español" stops being findable by its speaker. */}
        <span className={active ? "notranslate" : undefined}>{activeLabel}</span>
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul
          id="language-menu"
          className="notranslate absolute left-0 top-full z-50 min-w-[11rem] rounded-2xl border-2 border-rule bg-white p-2 shadow-lg md:left-auto md:right-0"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => select(lang.code)}
                aria-current={lang.code === active ? "true" : undefined}
                className={`flex min-h-[48px] w-full items-center rounded-xl px-4 font-bold no-underline hover:bg-sand hover:text-clay ${
                  lang.code === active ? "text-clay" : "text-ink-soft"
                }`}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* The widget needs a mount node even though its own UI stays hidden. */}
      <div id="google-translate-mount" />
    </div>
  );
}
