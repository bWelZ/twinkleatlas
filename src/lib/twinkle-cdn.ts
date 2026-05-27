/**
 * Twinkle Design System — CDN Registry
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all Twinkle asset URLs.
 *
 * Architecture:
 *   • Foundation files (tokens, typography, utilities, palettes) are versioned
 *     inside src/styles/twinkle/v2/ and bundled via @import in globals.css.
 *     These paths are "CDN-ready" — swap the base for https://tds.bwelz.org
 *     once those granular files are uploaded.
 *
 *   • Component files ARE on the real CDN (tds.bwelz.org) with CloudFront
 *     signed URLs. Load them with <link rel="stylesheet"> when adopting
 *     specific Twinkle components. All signatures expire 2031.
 *
 * Version: v2.1.0
 * CDN base: https://tds.bwelz.org
 * Key pair: K1PPZDIOWN47R1
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── CDN meta ────────────────────────────────────────────────────────────────
export const TWINKLE_VERSION = 'v2.1.0'
export const TWINKLE_CDN_BASE = 'https://tds.bwelz.org'
export const TWINKLE_COLOR_RAINBOW_HEX_CSS =
  'https://tds.bwelz.org/twinkle-colors/twinkle-color-rainbow-hex.css?Expires=1937142021&Signature=gEJH8oYfXRYvyko6CeXA-0G7Hvk56BiTSXrns5pkDRepy7adJhsLp9iiVc29SG7rWMci1M6ilhvSe8-3PiAwGa7EB~dsgwPfbgPFtrBrMdYE6SqICln~YaLwJACKfyyMAmE78pjuQnobrxJ5vvG55yOiSp0V0Mi9QiODgYvIpUnYFdqu3xf18he5-Bl8GPHfa06FTNPX4GsjfsCpTqbS6mv98fJL8BUo7R9pm5qvpFt0B1XUTw1TSP9eAUpSqECihmoeZ2SjUYqZb2Bsp40DwWLknJTqi5q4axFuoj6lyNH3S1az51TlqN-JqOS3Bppo2gjO-Vz9mk5mWK9fxoQAeA__&Key-Pair-Id=K1PPZDIOWN47R1'

// ── Foundation files (self-hosted, CDN-ready) ────────────────────────────────
// Loaded via @import in globals.css — order matters for cascade.
export const TWINKLE_FOUNDATION = {
  /** Primitive scale: color, spacing, radius, fonts, motion, z-index */
  coreTokens:    '/twinkle/v2/tokens/core.css',
  /** Semantic aliases: brand, surface, text, border, interactive */
  semanticTokens:'/twinkle/v2/tokens/semantic.css',
  /** Palette-independent status colors: red, yellow, green, blue, amber, purple */
  statusTokens:  '/twinkle/v2/tokens/status.css',
  /** Light mode reset (use to scope light inside a dark region) */
  modeLight:     '/twinkle/v2/modes/light.css',
  /** Dark mode surface/text/border overrides */
  modeDark:      '/twinkle/v2/modes/dark.css',
  /** Heading hierarchy, body, links, code — Nunito/Nunito Sans applied */
  typography:    '/twinkle/v2/base/typography.css',
  /** tw-text-*, tw-font-*, tw-truncate, tw-ellipsis, tw-uppercase … */
  utilities:     '/twinkle/v2/utilities/utilities.css',
} as const

// ── Palette files ────────────────────────────────────────────────────────────
export const TWINKLE_PALETTES = {
  /** Palatinate Blue #1f35ff — default WELS palette */
  blue:       '/twinkle/v2/palettes/blue.css',
  /** Mint #1dc386 — rainbow category 1 */
  mint:       '/twinkle/v2/palettes/mint.css',
  /** Violet #971adb — rainbow category 2 */
  violet:     '/twinkle/v2/palettes/violet.css',
  /** Ochre #c5761b — rainbow category 3 */
  ochre:      '/twinkle/v2/palettes/ochre.css',
  /** Turquoise #4fcab2 — rainbow category 4 */
  turquoise:  '/twinkle/v2/palettes/turquoise.css',
  /** Pink #e11474 — rainbow category 5 */
  pink:       '/twinkle/v2/palettes/pink.css',
  /** Red-Violet #c91885 — rainbow category 6 */
  redViolet:  '/twinkle/v2/palettes/red-violet.css',
} as const

// ── Brand overrides ──────────────────────────────────────────────────────────
export const TWINKLE_BRANDS = {
  /** WELS brand — composes with palette-blue. No overrides needed today. */
  wels: '/twinkle/v2/brands/wels.css',
} as const

// ── Component CDN URLs (real CloudFront signed — expire 2031) ────────────────
// Use these with <link rel="stylesheet"> when adopting a Twinkle component.
// Do NOT import these in globals.css — they are external CDN assets.
export const TWINKLE_COMPONENTS = {
  /** Accordion — collapse/expand panels (v2.0.0, 7 KB) */
  accordion: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/accordion/v2.0.0/dist/accordion.min.css?Expires=1936351516&Signature=PvD3r-Tu-ttH2RqQ8Ad-f1dpMcz4dDGjpSfWOVV1mArUWAwZeutnpbhKVOO7uNGFVotr72F93JzHBVgHOPMxKlTI78pJKna5NiBxmN~PC79OfDXxelqe6NtJiHA4SahKp1DFSVQdEPmFqFALgkce1s39nM3Xxi2LRq3cOlpDIF1rX5ikVmONbkHBTgAZyX0HBvEOsxWCsCk3XkZWnuCTx5hftGDNNFn7hENn42EQohwFi8oKW-1qhicuoM0m8XkGEko8DqBroZx2enMW2OphBzWqupsg1xE~CgHQ08pWB5bE72c7gnxjfay3gsE4UEuWZbHjyPIi-q8UePo-PzV5ow__&Key-Pair-Id=K1PPZDIOWN47R1',
    js:  'https://tds.bwelz.org/v2/components/accordion/v2.0.0/dist/accordion.js?Expires=1936351516&Signature=KLZanYvjaPyz06BrRv7xPLeyZsVjbh0P5kygHlKzGj~QdZBSIqBGn087c4-e5cSRbzu-jEvaxE9NUDmMlDK3RL1NpGcHzC2ZxDFKMuzcduOyYQanwmpd9tmfoPAKz5bzt8tmI47l78QsvTD-oMjJ9wxgNb2iAe5tbj4BVoc26Xhzj1li1PezQQH7VFAcbCxjQzbxNbkteqAa3AItibzxEiBCVmMcyF34TQHFAXxb66I2KAJfcyh4Ptfid~Mpq4XrGboFpgU7aa6KbyqXTQHPyejgmDTvHW9rDMdspA3G15B-gSjHEJ3DCU8kw7AdMo-lua2AjdMxofbYDUaMEVkWSA__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Badge — status and category chips (v2.0.0, 10 KB) */
  badge: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/badge/v2.0.0/dist/badge.min.css?Expires=1936351518&Signature=VyVdlTB9LX2mD9xA46l7x4hrYNm4FTGkHWgHhrNz0yhTgfCgvqfN6ZNK4MtnYe5p0P8g1XK-YolgymjaVsyFDc-4mjaRFnI19tXdyTsQlJg~wAcu71K~001o9GYUJHuNYdTiHUOxEUF0acwbOgKa0977dk0mL0LF3~nH6yE7SLBqrkMp8WHvFUpRQFGwmZq-VPoQ00kvqSdqI5vrKIrjKNRDYkcJ3xGfk~QFH~3zyKrfo4TVytuVirJj6M8xGpCbBRKTxRm0q8SJ3DCjS7nCNye2D4tgjERZEMNyVkYq4GfXGharQBpK2lQEfeOSiuPdCE3RWCiPiRi5RePi2XTX5A__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Button — primary action element (v2.0.0, 18 KB) */
  button: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/button/v2.0.0/dist/button.min.css?Expires=1936351518&Signature=TD6VD5azBl9Q5otiZXYa6N5YzwXE1ErXbqWbJPk9S944DuMfObF0kYijfrVbpMxaQi9WaQeBv9VuIRgqx50OEQgTXrI0ZwyL6scPZtZ7OOyjNc035HIFrV5CoLIA00gaJk0Ei6r41-2oYmLgpz60aEe0ebmpAm1KD87rff7riNHwT1KForhQNj~gcRTSdcGXmpfXphH-R~3wHIwT758N6EEARxiXcF6zq~WWhdfIeo0fjTF9hum-WkI85HJjJ2GKmbiIBXuTG3bgV5MlU1iVQMCIGtUYNaa4u1u890~LJn2j-QngSKVNjl2d9nVUznNOSVoKSrPnsjoeCnymyx45Jg__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Data display — Card, Stat, Avatar, Table, Tooltip, Empty State (v2.0.0, 24 KB) */
  dataDisplay: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/data-display/v2.0.0/dist/data-display.min.css?Expires=1936351520&Signature=dJg4EINH04ihM1myNwa552pkWGPK7lnsglbMPU-hgIN8IHc3enfK5VkD~EBsNGjaS012kFj4j5fXlSJ4q0g-n3BRtHqerPw3aI7SJTg8FX4FtUnTM4vsM-yOa7RYJlpoexf06gULY4AjpS11QH7q97F4Im2sD~wxqZNzOMANY9SEA0lSj0ykNnaM8x4~ynzsSqcJE9s49RpvW5vXmp7bAVUZuEciU7~4-dkWEDPpATotf8p0cQyI86OsjgCHHctVGhOB7MTdnFKPU6h6hJCvmgliwqKxauD6tJ9J2AK8OZNMaBgliRoRfQ3HiOnLx4LA-0e4UL50tEqWr~q2ciQNSQ__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Drawer — slide-in panel (v2.0.0, 9 KB) */
  drawer: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/drawer/v2.0.0/dist/drawer.min.css?Expires=1936351520&Signature=gIQ0SphTDF7nYu8Enz9UhmzmIhpzoccv3bH8-t~7cWHKyNTqvTTX2FPJninHSpviErPm0ATrGYp7-m~p~tO2gLGZjwetxJreS-DjFNqVQ6iYlJ6~R3M6EYharlMRcuMQk74GutPpOF2XVKMtYpLLrvrmc-ckQ53TQjl20ts93gnQPD~NR8cND267lAu6untGY8sueMsqENZz2W4jbZhDxlQBTK46Qdhrn8GNXiA30LEULitVlzYweSbTjAqcJBZ9eR8Cn~b2pQXocb1y-9pn4UbxW-a8EQ24gOjVclqIaptKelDqeGIAoF6hHY8PdVDSUmCQkz9n3MsshJLsGJQAow__&Key-Pair-Id=K1PPZDIOWN47R1',
    js:  'https://tds.bwelz.org/v2/components/drawer/v2.0.0/dist/drawer.js?Expires=1936351520&Signature=jURp1L792qLz70Hy-G9FRJyoh-BrDI4wi8Q2ExLmYr8vnUyc9UqK2xENu1ITsyZMXj1kopQ3YHTaWZxyyATPBGDlPbuKXCoCmJlqvrY~QBN-V9qYTzxxGmupc~jRCMMvZiSHmctRiHiV4PcNTgXD63uWoJ~CVBEHOrsOhYFZMGGBI0tD2beajB9p-YF1D7BacEVfVUN3~Ne0PnaAKyTJdWjK95VflefDX96lQX70Q-1ek59nmxFezQTaWiryT2OImlr99Pw-lN3A3OkbaCDWIeGkCKG5PxUC383-vYfSsdo~O6EwNONfMNwrveOqYu83jQczX2C1Ly9Yd9M8B8syDQ__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Feedback — Alert, Toast, Modal, Spinner, Skeleton, Progress (v2.0.0, 23 KB) */
  feedback: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/feedback/v2.0.0/dist/feedback.min.css?Expires=1936351522&Signature=bOfTKOj2z7~KJB8yHdyW57EXUY1ve2u2ClLGL8Uu7ThsKSQhfUy3JwJf5xB8EYzMO48CIoa8Qz3M5fZ0lYEKza8uy73qISytmecAESZIImXgjBozm23WuvCkQmXVlsG-RrCur4m7qUswocSMtbbUDjZcPeyUcAaeAXLhEA2kt5RXBUMW516CPEq8FKpgSd5OQKYouTcEPAuiX-sNfqSEljuxQMZkOWQxW3IMYp-QJ~InPTkEeVvrsxISZLgXRGggmg-6b8x3zR~DKuSdLXNfaInyEldWRzRAKEk0brYe7eQ3hv~KJqhw8-4BThtnbF42eFWjZ2r659TWh2TZx3gBnw__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Field — text inputs, select, textarea, checkbox, radio (v2.0.0, 25 KB) */
  field: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/field/v2.0.0/dist/field.min.css?Expires=1936351523&Signature=dXLPb7U6lecY9Pf~iQmiLiTY-RSR9wle3xqyR8mIWhybIBcaUX6rEaCy~PNiI5l3whMHm4-1~xzfvyvnkKgZ9Ohp5xqZ0nj7kPtyv9RfvXRt~WbREyPCL9Egck5UNOQEkpJCFXsmJsn6oJRlzX92A5xtz25wTMqsMuIPblXAyDlpc5wAQ8~BQGX59hl3TfUH8WONFCmAtilKP2TPkRbYluOSVXzWmsv3pA3Pb~NToV26Bvn4uOmQh2dFpDOpvKNOYFqeMzsgkuHGtw8cXQtnmIFhMXEJT25T5pDTaE1YU9-33NqiVfFo-Uq1KjMisr52yH6dg-Rb45KZd0jEtetndw__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /**
   * Navigation — Tabs, Breadcrumb, Pagination, Dropdown
   * v2.0.1 supersedes v2.0.0 — use this for tabs (overflow-x fix included)
   */
  navigation: {
    version: 'v2.0.1',
    expires: '2031-05-21',
    css: 'https://tds.bwelz.org/v2/components/navigation/v2.0.1/dist/navigation.min.css?Expires=1937135180&Signature=QuWRWuSZbsJOas-S335DF85oYy2oR~QGbx8j8Ljs-VUYC5fI~LM54-r2r0uFhlG1Z~TjusuODsPL6FodbsPOKwLVLr74EvsxJixlaaY~ck5VKuNueUI8u-8OcedjYX4kTWB8-L849cf~b39KDg~XQffxdl8hbRELh8nPO9LjIz6LaDFaq975rcnNP1jlX1zHLka8mLHKau09U7BXs55zNnXbHE5dNabQHvcOALRTO4vqjLGLRFjymbSnH6yU7htBgAd6umW7vZJO2Qh29t-Z~Sq2Ru-2m4jDpPsfWH8Ifu7PcgaTPe12SOPPmxPtwOelTiNBIunSX8HSQB6abVXiKg__&Key-Pair-Id=K1PPZDIOWN47R1',
    js:  'https://tds.bwelz.org/v2/components/navigation/v2.0.1/dist/nav.js?Expires=1937135180&Signature=RZuFgcvcVCQys9GR5AQTlQ3-NdjbzFZfwd4tTS44SiudhFZJq68~GUzN1d7n2MhU9EoKPI9~1myUOdtQsMVNcJ8aNRqsKRRAs7tB307nXlB2tfSx3Gi9mZiT-WaZKh3tmpuJBlzekXCHtIF5~~k8HJ3~IyE7yPRM8kcNaO89gqsIowsQ-g9U~DrZK5y7diN5sgzJimb7Hl-Xx6rm33gO2Jqa2T0Oh5r1hIpgzHOXzUnRYmucGWLeFC3dZfAMnEuabQlBddZTRIN1FsoDGl4wJxyK~eFOyA9XwukFb47GSaKs9UfKUL~eveQWu21ibzzEQhxmfmf2WJMUcWYPRaB4JQ__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Controls — Segmented Control pill track (v2.0.0, 8 KB, pure CSS) */
  controls: {
    version: 'v2.0.0',
    expires: '2031-05-21',
    css: 'https://tds.bwelz.org/v2/components/controls/v2.0.0/dist/controls.min.css?Expires=1937135173&Signature=OtNfzGFPRGayJXPT6T3bkh-qw-oIGkwI~AREmhknVInzukrVy6L2S6SeOwf~XnLfRn-Mq2fCIIBSQ9ya7yft~fXEDru59WzBc7-Sdu0kIrbXqgRAsITxsCjfxui89d-op5QNzCBzRKoyaNLD-c8iDBdmIEFKfH~kJf-ont6AaLSq9wovDO24ib2kiAy86kWYMHxHEMiTTUCRyvvtOvE9xCBAsACel86ruyXqFbai7RK7R6cjS3VBxFTFKRPuWEHn9ZJiU5mVMtqmi78bgsD-dTC5gagbJBhpQeBZFLQvs-UH2p9ul~zWwXhVp0CpGfF~HtOR2hPLh1uHlaRFk~rgSQ__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
  /** Advanced — DataTables integration, File Upload, Stepper (v2.0.0, 32 KB) */
  advanced: {
    version: 'v2.0.0',
    expires: '2031-05-12',
    css: 'https://tds.bwelz.org/v2/components/advanced/v2.0.0/dist/advanced.min.css?Expires=1936351517&Signature=Kq4T-HvHIrDIMuojg~cOVlL48V-aPRExPhYwWtoPGC7Z7PTtQEusf2U04UzuSVrpcOmzEtSU9vV5YjL-IS21OF05hSBcaT5bNLMiz4~Rbf7-jqqtNw70m-2SxqF-HxerI7J-0MGQGu~NE9MnaTbeRJd9~Gb~ai5y7E2XKAUl7ZHdN2mMciHyTQ7INzvyZrl3PTZFFFjqDH8IUhI9qKDgBcTItsrukErYtM6fJ3D1JEgz6K6Dc7QjaXlcE8QjDHoV2EVthBX0gWaFIMJPqh6fZ8eyGZOAbi0-i-x4BhibpouFGGAuclZ21WEO757OSC9DDu-uKNJztLNEzvpRhJmgwg__&Key-Pair-Id=K1PPZDIOWN47R1',
  },
} as const

// ── Typed helpers ────────────────────────────────────────────────────────────
export type TwinkleComponentKey = keyof typeof TWINKLE_COMPONENTS
export type TwinklePaletteKey   = keyof typeof TWINKLE_PALETTES

/** Returns true if the component has an associated JavaScript file */
export function componentHasJs(key: TwinkleComponentKey): boolean {
  return 'js' in TWINKLE_COMPONENTS[key]
}
