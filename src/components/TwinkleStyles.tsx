import { TWINKLE_COLOR_RAINBOW_HEX_CSS, TWINKLE_COMPONENTS } from '@/lib/twinkle-cdn';

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
      {/* Rainbow palettes — loaded BEFORE blue so named vars (--mint, --dark-violet…)
          are available but the --tw-color-* scale is restored by blue below */}
      <link rel="stylesheet" href="/twinkle/v2/palettes/mint.css" />
      <link rel="stylesheet" href="/twinkle/v2/palettes/violet.css" />
      <link rel="stylesheet" href="/twinkle/v2/palettes/ochre.css" />
      <link rel="stylesheet" href="/twinkle/v2/palettes/turquoise.css" />
      <link rel="stylesheet" href="/twinkle/v2/palettes/pink.css" />
      <link rel="stylesheet" href="/twinkle/v2/palettes/celestial-blue.css" />
      <link rel="stylesheet" href="/twinkle/v2/palettes/red-violet.css" />
      {/* Rainbow hex tokens: --persimmon-regular, --caribbean-green-regular, etc. */}
      <link rel="stylesheet" href={TWINKLE_COLOR_RAINBOW_HEX_CSS} />
      {/* WELS Palatinate Blue palette — restores --tw-color-* scale as the active brand */}
      <link rel="stylesheet" href="/twinkle/v2/palettes/blue.css" />
      {/* WELS brand overrides (structure ready, no changes needed today) */}
      <link rel="stylesheet" href="/twinkle/v2/brands/wels.css" />
      {/* Utility classes: .tw-text-*, .tw-font-*, .tw-truncate, etc. */}
      <link rel="stylesheet" href="/twinkle/v2/utilities/utilities.css" />
      {/* Twinkle Icons v2.0.1 — icon font, font files served from CDN */}
      <link rel="stylesheet" href="/twinkle/icons/v2.0.0/twinkle-icons.css" />
      {/* Navigation component: Tabs, Breadcrumb, Pagination (v2.0.1) */}
      <link rel="stylesheet" href={TWINKLE_COMPONENTS.navigation.css} />
    </>
  )
}
