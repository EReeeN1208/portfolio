# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Eren Kural's personal portfolio site: a single static HTML page styled with the Tailwind CDN build, no bundler, no package.json, no build step. It's deployed via GitHub Pages (see `CNAME` — custom domain `erenkur.al`).

## Running locally

There's no dev server or build command. Open the HTML files directly in a browser, or serve the directory statically, e.g.:

```
python3 -m http.server
```

## Architecture

- Everything lives in one document, `index.html` — there are no other top-level pages. What used to be separate pages (Projects, Music, Papers & Talks, Awards, Volunteering) are now `<section id="...">` blocks stacked inside `<main>`, in nav order, each visually separated by a top border (`border-t`) and spacing (`mt-20 pt-16`).
- The header nav and the logo link are anchor links (`#home`, `#projects`, `#music`, `#publications`, `#awards`, `#volunteering`) that jump to the matching section on the same page — there is no multi-page navigation anymore. `<html>` carries `scroll-smooth` so anchor jumps animate; sections carry `scroll-mt-24` to clear the sticky header when jumped to.
- The Awards & Test Scores block (below Papers & Talks) is the one exception to the "section has an `h2` + intro paragraph" pattern: it has no top-level heading of its own, just two `h3` subsections ("Awards", "Test Scores") directly inside a bare `<section>`. The `#awards` anchor id sits on the "Awards" subsection's wrapper `<div>` (with `scroll-mt-24` moved there too), not on the outer `<section>`, so the nav link jumps straight to that subheading.
- The header is `sticky top-0 z-50` with an explicit background (`bg-white dark:bg-neutral-900`) so it stays pinned at the top while scrolling and content doesn't show through underneath it.
- Heading levels are demoted one level from the old per-page versions since the page now has a single `<h1>` (the name, in the `#home` section): section titles (Projects, Music, etc.) are `h2`, and headings that were nested under them (card titles, "Releases") are `h3`/`h4` accordingly.
- Styling is Tailwind CSS loaded via the CDN script (`<script src="https://cdn.tailwindcss.com"></script>`) with inline utility classes only — there is no `tailwind.config.js` or compiled stylesheet. Dark mode is configured as `darkMode: "media"` (follows OS preference, no manual toggle).
- `js/main.js` wires up the mobile nav toggle (`#nav-toggle` shows/hides `#site-nav`) and closes that menu whenever a nav link is clicked, since clicking now scrolls within the page instead of navigating to a new one (the menu would otherwise stay open over the section you just jumped to).
- `js/main.js` also runs a scroll-spy: an `IntersectionObserver` (rootMargin biased toward the top ~30% of the viewport, to account for the sticky header) tracks which section is currently in view and toggles the `underline` class on the matching nav link, removing it from the rest. All nav `<a>` tags share the same base classes (`hover:underline underline-offset-4`) precisely so JS is the only thing adding/removing `underline` — don't hardcode `underline` on a specific link in the HTML again, or it'll conflict with this logic.
- `assets/images/` holds static images referenced directly by relative path (e.g. `assets/images/eren-portrait.jpg`).

## Conventions

- Match the existing look: black/white with `dark:` variants throughout, `max-w-[72rem] mx-auto px-5` as the page container, underlined links (`underline underline-offset-4`), no custom CSS files — everything is Tailwind utility classes inline in the HTML.
- When adding a new top-level section, follow the existing pattern: a `<section id="...">` with `mt-20 pt-16 border-t border-gray-300 dark:border-gray-700 scroll-mt-24`, plus a matching `<li>` anchor link added to the header nav.
- Placeholder content is marked with `<!-- TODO -->` comments (e.g. the bio text in the `#home` section) — check for these before treating a section as finished.
