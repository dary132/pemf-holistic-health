"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const fields = [
  { name: "name", label: "Your Name", type: "text", required: true },
  { name: "phone", label: "Your Phone Number", type: "tel", required: false },
  { name: "email", label: "Your Email Address", type: "email", required: true },
  { name: "city", label: "City / Town", type: "text", required: false },
  { name: "zip", label: "Zip / Postal Code", type: "text", required: false },
  { name: "reason", label: "Reason for Visit", type: "text", required: false },
] as const;

export default function ContactForm() {
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      ...fields.map((f) => `${f.label}: ${data.get(f.name) || "-"}`),
      "",
      `Message: ${data.get("message") || "-"}`,
    ];
    const subject = encodeURIComponent("Website inquiry — PEMF for Holistic Health");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label key={f.name} className="text-sm text-brand-dark">
          <span className="mb-1 block font-medium">
            {f.label}
            {f.required && <span className="text-accent"> *</span>}
          </span>
          <input
            name={f.name}
            type={f.type}
            required={f.required}
            className="w-full rounded-lg border border-brand/20 bg-white px-3 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
      ))}

      <label className="text-sm text-brand-dark sm:col-span-2">
        <span className="mb-1 block font-medium">
          Your Message<span className="text-accent"> *</span>
        </span>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-brand/20 bg-white px-3 py-2.5 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </label>

      <label className="sm:col-span-2 flex items-start gap-2 text-xs text-ink-soft">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          required
          className="mt-0.5 accent-[--brand]"
        />
        By submitting this form, you confirm that all your information is correct.
      </label>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-brand px-8 py-3 text-white font-medium hover:bg-brand-dark transition-colors"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
