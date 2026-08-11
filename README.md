# PEMF for Holistic Health Landing Page

Sample landing page template for **PEMF for Holistic Health** (Lake Forest, CA), built from the
client's "Website 2025" specification (`docs/Website 2025.docx`).

Single-page template with anchor navigation covering the spec's sections: PEMF, Holistic Health,
Qi Energy, Sleep, Mental Health (Stress / Relaxation), Sports, Animals, Products, and Contact.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- Hosted on Vercel

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `app/page.tsx`: the landing page (all sections)
- `components/`: Header, Footer, Section, VideoEmbed
- `lib/site.ts`: business info, nav links, disclaimer (edit client details here)
- `public/images/`: assets extracted from the client's document
- `docs/`: original client specification

## Notes

- Per client request there is no contact form or email on the page. All contact prompts point
  to the main phone number in `lib/site.ts`.
- All health-related copy comes from the client's document verbatim or lightly edited, and the
  client's medical disclaimer is shown in the footer.
