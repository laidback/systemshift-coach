# i18n

All UI copy lives in `translations.ts` as a typed dictionary. Two languages: `en` (default) and `de`.

## Usage in Astro pages

```ts
import { translations, type Lang } from '../i18n/translations';

// The current page renders both languages; JS toggles visibility.
// Reference strings like:
const en = translations.en;
const de = translations.de;
```

## Adding a new string

1. Add the key + EN value under `translations.en`
2. Add the DE translation under `translations.de`
3. TypeScript will error if a key is missing in either language

## Adding a new language

1. Add a new key to the `Lang` type: `export type Lang = 'en' | 'de' | 'fr'`
2. Add a `fr: { ... }` block to the `translations` object with all keys
3. Add the language toggle button in the header

## Notes

- The site uses a JS-toggle pattern (`.en` / `.de` CSS classes) rather than separate routes.
  This keeps the static build to a single `index.html` and avoids redirect complexity for now.
- If we switch to Astro's built-in i18n routing (`/en/` and `/de/` routes), migrate strings
  from this file into Astro's content collections or `src/content/` directory.
