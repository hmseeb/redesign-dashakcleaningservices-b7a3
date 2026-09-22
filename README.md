# DASHAK Cleaning Services — Website

A complete redesign of the DASHAK Cleaning Services website: house cleaning and
commercial cleaning in Mansfield, Texas and DFW South.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no external APIs.

| File | Purpose |
| --- | --- |
| `index.html` | Entry point. Semantic single-page site with all sections. |
| `styles.css` | Design system (tokens, components) + responsive layout. |
| `script.js` | Mobile nav, dropdowns, FAQ accordion, scroll reveal, scrollspy, forms. |
| `favicon.svg` | Brand favicon. |
| `robots.txt` | Crawler directives. |

## Sections

Hero · trust bar · how it works · about · cleaning process · 9 services ·
testimonials · satisfaction guarantee · FAQ · service areas · blog ·
quote form + contact details · footer.

## Business details

- **Phone:** +1-682-529-6113
- **Email:** support@dashakcleaningservices.com
- **Address:** 1671 E Broad St, Suite 103 PMB 1030, Mansfield, TX 76063
- **Hours:** Mon–Fri 9.00am–8.00pm · Sat 9.00am–8.00pm · Sun 9.00am–4.00pm
- **Service areas:** Mansfield, Grand Prairie, Arlington, Midlothian, Fort Worth,
  Burleson, Kennedale

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Notes

- The quote and newsletter forms have no backend; they compose a prefilled
  `mailto:` message to `support@dashakcleaningservices.com`.
- Imagery: the original brand logo and customer review avatars are kept from the
  source site; all generic/template stock photography was replaced with
  section-specific photos from Pexels.
