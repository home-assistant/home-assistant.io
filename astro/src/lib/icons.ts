// Icon path data for the Astro components.
//
// Every icon is the `d` attribute of a single 24x24 path from Material
// Design Icons (https://pictogrammers.com/library/mdi/, Apache 2.0),
// the same set the Jekyll site loads through Iconify's `mdi:` prefix.
// Storing bare path data keeps the file free of markup and matches the
// shape the `@mdi/js` package exports, so if the migration adopts that
// package this file becomes a list of re-exports and nothing else
// changes. Render an icon with `<Icon name="…" />`
// (src/components/Icon.astro).
//
// To add an icon, copy its path from the MDI library under its MDI
// name. Keep the list alphabetical.

export const icons = {
  /** arrow-right */
  "arrow-right":
    "M4 11v2h12l-5.5 5.5l1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5L16 11z",
  /** chevron-down */
  "chevron-down":
    "M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z",
  /** code-braces */
  "code-braces":
    "M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2a2 2 0 0 0 2-2V5h2V3m6 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2a2 2 0 0 1-2-2V5h-2V3z",
  /** cog */
  "cog":
    "M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z",
  /** comment-processing-outline */
  "comment-processing-outline":
    "M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L13.08 16H20V4H4v12zm7-5h-2V9h2zm-4 0h-2V9h2zm-4 0H7V9h2z",
  /** gauge */
  "gauge":
    "M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 2a8 8 0 0 1 8 8c0 2.4-1 4.5-2.7 6c-1.4-1.3-3.3-2-5.3-2s-3.8.7-5.3 2C5 16.5 4 14.4 4 12a8 8 0 0 1 8-8m2 1.89c-.38.01-.74.26-.9.65l-1.29 3.23l-.1.23c-.71.13-1.3.6-1.57 1.26c-.41 1.03.09 2.19 1.12 2.6s2.19-.09 2.6-1.12c.26-.66.14-1.42-.29-1.98l.1-.26l1.29-3.21l.01-.03c.2-.51-.05-1.09-.56-1.3c-.13-.05-.26-.07-.41-.07M10 6a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 9a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m10 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1",
  /** home-assistant */
  "home-assistant":
    "M22.939 10.627L13.061.749a1.505 1.505 0 0 0-2.121 0l-9.879 9.878C.478 11.21 0 12.363 0 13.187v9c0 .826.675 1.5 1.5 1.5h9.227l-4.063-4.062a2 2 0 0 1-.664.113c-1.13 0-2.05-.92-2.05-2.05s.92-2.05 2.05-2.05s2.05.92 2.05 2.05c0 .233-.041.456-.113.665l3.163 3.163V9.928a2.05 2.05 0 0 1-1.15-1.84c0-1.13.92-2.05 2.05-2.05s2.05.92 2.05 2.05a2.05 2.05 0 0 1-1.15 1.84v8.127l3.146-3.146A2.05 2.05 0 0 1 18 12.239c1.13 0 2.05.92 2.05 2.05s-.92 2.05-2.05 2.05a2 2 0 0 1-.709-.13L12.9 20.602v3.088h9.6c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.477-1.977-1.061-2.561z",
  /** robot-happy */
  "robot-happy":
    "M22 14h-1c0-3.87-3.13-7-7-7h-1V5.73A2 2 0 1 0 10 4c0 .74.4 1.39 1 1.73V7h-1c-3.87 0-7 3.13-7 7H2c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1v1a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1M9.79 16.5C9.4 15.62 8.53 15 7.5 15s-1.9.62-2.29 1.5c-.13-.31-.21-.64-.21-1a2.5 2.5 0 0 1 5 0c0 .36-.08.69-.21 1m9 0c-.39-.88-1.29-1.5-2.29-1.5s-1.9.62-2.29 1.5c-.13-.31-.21-.64-.21-1a2.5 2.5 0 0 1 5 0c0 .36-.08.69-.21 1",
  /** solar-power-variant */
  "solar-power-variant":
    "M3.33 16H11v-3H4zM13 16h7.67L20 13h-7zm8.11 2H13v4h9zM2 22h9v-4H2.89zm9-14h2v3h-2zm4.76-.79l1.42-1.42l2.12 2.12l-1.41 1.42zm-11.05.7l2.12-2.12l1.41 1.42l-2.12 2.12zM3 2h3v2H3zm15 0h3v2h-3zm-6 5c2.76 0 5-2.24 5-5H7c0 2.76 2.24 5 5 5",
  /** view-grid */
  "view-grid":
    "M3 11h8V3H3m0 18h8v-8H3m10 8h8v-8h-8m0-10v8h8V3",
} as const satisfies Record<string, string>;

export type IconName = keyof typeof icons;
