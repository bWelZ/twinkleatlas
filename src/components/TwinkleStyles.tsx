/**
 * TwinkleStyles — Twinkle DS foundation loader
 *
 * Renders <link rel="stylesheet"> tags for Twinkle DS v2.1.0 token,
 * palette, and utility files served from /public/twinkle/v2/.
 *
 * These files only define --tw-* CSS custom properties and .tw-*
 * utility classes — they carry no element selectors and are safe
 * to load without affecting existing layout or Tailwind styles.
 *
 * typography.css is intentionally excluded (it has element selectors
 * that would fight Tailwind's base layer). Font hierarchy lives in
 * globals.css @layer base instead.
 *
 * To add a Twinkle component bundle, import TWINKLE_COMPONENTS from
 * src/lib/twinkle-cdn.ts and add a <link> tag below.
 */
export function TwinkleStyles() {
  return (
    <>
      {/* Primitive scale: spacing, radius, color steps 0–9, motion, z */}
      <link rel="stylesheet" href="/twinkle/v2/tokens/core.css" />
      {/* Semantic aliases: --tw-color-brand, --tw-color-text-*, etc. */}
      <link rel="stylesheet" href="/twinkle/v2/tokens/semantic.css" />
      {/* Status colors: error, warning, success, info */}
      <link rel="stylesheet" href="/twinkle/v2/tokens/status.css" />
      {/* WELS Palatinate Blue palette (#1f35ff scale) */}
      <link rel="stylesheet" href="/twinkle/v2/palettes/blue.css" />
      {/* WELS brand overrides (structure ready, no changes needed today) */}
      <link rel="stylesheet" href="/twinkle/v2/brands/wels.css" />
      {/* Utility classes: .tw-text-*, .tw-font-*, .tw-truncate, etc. */}
      <link rel="stylesheet" href="/twinkle/v2/utilities/utilities.css" />
      {/* Twinkle Icons v2.0.1 — icon font, font files served from CDN */}
      <link rel="stylesheet" href="/twinkle/icons/v2.0.0/twinkle-icons.css" />
    </>
  )
}
