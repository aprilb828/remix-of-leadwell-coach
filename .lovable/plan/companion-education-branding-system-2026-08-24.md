# Companion Education™ branding system

Apply the shared Companion Education™ visual system to the Coach Edition: apple mark, color tokens, navy header, pill tabs, standard footer, and per-page titles. No feature or wording changes.

## Logo and icon

- Download the apple mark from the link provided and save it as `src/assets/companion-apple.png`.
- Create a padded 64x64 square copy at `public/favicon.png` (the `public/` folder doesn't exist yet and will be created).
- Declare it in the root route as the site icon and delete the default `public/favicon.ico`.

## Color tokens

The token block was not included in the message. Unless you paste it before I build, I'll define the palette from the brand mark and the existing navy header:

- `primary` — deep navy (current header navy, kept)
- `accent` — the mauve from the apple mark
- `amber`, `warning` — warm amber for follow-ups and cautions
- `success`, `success-soft` — green pair for completed items
- `surface` — soft neutral used for the tab bar and card backgrounds
- `hero` — tinted band behind the header/hero area

All defined for light and dark in `src/styles.css`, registered in `@theme inline` as `--color-<name>: var(--<name>)`. If you paste the official values, they replace these outright.

## Header

Navy bar carrying: the apple mark in a rounded translucent tile, the product name with edition and ™, the tagline beneath, the date on the right, and small pill buttons for Export, Tour, and Framework. The current Tour and Export controls keep their behavior; About becomes the Framework pill target unless you want a separate button.

## Tabs

The tab strip becomes a rounded pill bar on the surface color, each tab a rounded pill with its existing emoji, the active tab filled navy with light text. Same eight tabs, same labels.

## Footer

One link row in fixed order — the topic page · About Companion Education™ & our founder · Contact us — followed by:

`Companion Education-Coach Edition™ · The Companion Ed Framework™ · © 2026 Companion Education™ · Created by April Stephens Bryson · april@companioneducation.com`

Applied identically on the home, About, and Contact pages. Note: this app has no separate topic SEO page yet, so the first link will point at the home dashboard unless you want me to add one.

## Page titles

Home, About, and Contact each get their own unique title and description.

## Rules held throughout

- Semantic tokens only — no hardcoded color utilities.
- Section titles keep the leading emoji plus em-dash subtitle pattern.
- Every standalone Companion Education and Companion Ed Framework carries ™.

## Technical notes

- Files touched: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, `src/routes/contact.tsx`, plus a small shared footer component.
- Tailwind v4: tokens live in `src/styles.css`; there is no JS config file.
- Favicon square is produced by resize-and-pad so the mark isn't stretched.
