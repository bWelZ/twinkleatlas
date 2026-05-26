import { cn } from '@/lib/utils'

/**
 * Twinkle Icons v2.0.1 — icon font wrapper.
 * Renders <i class="tw-icon-{name}"> with consistent sizing.
 *
 * Sizes:  xs → 12px  sm → 16px  md → 20px (default)  lg → 24px  xl → 32px
 *
 * Usage:
 *   <TwinkleIcon name="calendar" />
 *   <TwinkleIcon name="person" size="lg" className="text-violet-500" />
 */

export type TwinkleIconName =
  | 'accessible' | 'age-group' | 'all-criteria-met' | 'apple' | 'arctic'
  | 'area-chart' | 'arrow-back' | 'arrow-back-small' | 'arrow-down-box'
  | 'arrow-down-small' | 'arrow-forward' | 'arrow-forward-small'
  | 'arrow-sign-check' | 'arrow-sign-check-point' | 'arrow-up-box'
  | 'arrow-up-small' | 'ascend' | 'badge' | 'badge-check' | 'badge-children'
  | 'badge-circle' | 'badge-one-star' | 'badge-person' | 'badge-three-stars'
  | 'badge1' | 'bank' | 'bar-chart' | 'beach-sun' | 'bell' | 'binoculars'
  | 'board-a' | 'bold' | 'box' | 'briefcase' | 'bullet-list' | 'calendar'
  | 'calendar-check' | 'calendar-clock' | 'calendar-medical-cross'
  | 'calendar-minus' | 'capi' | 'card-checkmark' | 'career-journey'
  | 'cda-rise-app' | 'certificate' | 'checklist' | 'checklist-board'
  | 'checklist-pencil' | 'checkmark' | 'checkmark-circle' | 'child'
  | 'child-pencil' | 'child-plus' | 'child-post' | 'child-sick' | 'child-x'
  | 'clock' | 'cloud-lines' | 'coaching' | 'cog' | 'coin-slot' | 'credit-card'
  | 'csv-file' | 'ddoe' | 'degree-cap' | 'degree-rise-app' | 'del' | 'diploma'
  | 'display-board' | 'document' | 'document-pencil' | 'document-plus'
  | 'document-signature' | 'documents' | 'dollar-document' | 'dollar-plant'
  | 'dollar-ticket' | 'double-arrow-back' | 'double-arrow-forward-copy'
  | 'download-file' | 'duplicate' | 'eafl' | 'elc' | 'elcmdm' | 'elcpinellas'
  | 'elevated' | 'envelope' | 'exit-fullscreen' | 'experience' | 'family'
  | 'family-childcare' | 'file-arrow-up' | 'finish-arrow' | 'flag' | 'flying'
  | 'folder' | 'folder-file-plus' | 'four-circles' | 'four-corners'
  | 'fullscreen' | 'gif-file' | 'globe' | 'heart' | 'home' | 'horizontal-line'
  | 'image' | 'impersonation' | 'in' | 'info' | 'intersect' | 'italic' | 'jar'
  | 'jpg-file' | 'language' | 'laptop' | 'lens' | 'lens-minus' | 'lens-plus'
  | 'lens-rectangle' | 'line-chart' | 'line-rectangle' | 'link' | 'lock'
  | 'lock-check' | 'lock-dots' | 'long-arrow-back' | 'long-arrow-forward'
  | 'mde' | 'mdhs' | 'megaphone' | 'megaphone-active' | 'megaphone-straight'
  | 'message' | 'message-lines' | 'message-pencil' | 'metal-can'
  | 'microsoft-teams' | 'mobile' | 'note' | 'number' | 'one-criteria-met'
  | 'open-lock' | 'ordered-list' | 'out' | 'pathway' | 'pathway-circle'
  | 'pathway-hexagon' | 'pdf-file' | 'people' | 'people-badges' | 'person'
  | 'person-background' | 'person-book' | 'person-circle' | 'person-cog'
  | 'person-exclamation' | 'person-in-person' | 'person-letter-checkmark'
  | 'person-message' | 'person-plus' | 'person-template' | 'phone'
  | 'pie-chart' | 'pin' | 'pkc' | 'plane' | 'plant' | 'plastic-bottle'
  | 'play' | 'plus' | 'plus-circle' | 'pollo' | 'portal' | 'printer'
  | 'prohibited' | 'pulse-list' | 'puzzle' | 'question-mark' | 'radius'
  | 'reading' | 'recycle' | 'review' | 'river' | 'routing'
  | 'scholarship-journey' | 'school' | 'school-arrow' | 'school-lock'
  | 'school-management' | 'school-number-symbol' | 'school-person' | 'seek'
  | 'shapes' | 'shield-checkmark' | 'shining-light-bulb' | 'sign-in-out'
  | 'sort-ascending' | 'sort-descending' | 'square-diagonal-arrow'
  | 'stacker-ring' | 'stacker-ring-1' | 'stacker-ring-2' | 'stacker-ring-3'
  | 'stacker-ring-4' | 'stacker-ring-5' | 'stairs-arrow-down'
  | 'stairs-arrow-up' | 'star' | 'sun' | 'syringe-document' | 'table-document'
  | 'target' | 'tb5' | 'tct' | 'three-boxes' | 'three-columns'
  | 'three-horizontal-center-lines' | 'three-horizontal-dots'
  | 'three-horizontal-equalizer' | 'three-horizontal-lines'
  | 'three-hotizontal-left-lines' | 'three-vertical-dots' | 'time-circle'
  | 'time-circle-arrow-back' | 'timer' | 'trainer' | 'trainer-app'
  | 'trainer-application' | 'trash-can' | 'triangle-exclamation'
  | 'two-arrows-in-circle' | 'two-arrrows-direction' | 'two-columns'
  | 'underline' | 'unordered-list' | 'versions' | 'video' | 'voided-check'
  | 'weather' | 'wrench' | 'wsf' | 'x' | 'x-circle' | 'xlxs-file' | 'zoom'
  | 'zoom-wordmark'

export type TwinkleIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<TwinkleIconSize, string> = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xl: '2rem',
}

export interface TwinkleIconProps {
  name: TwinkleIconName
  size?: TwinkleIconSize | (string & {})
  className?: string
  style?: React.CSSProperties
  'aria-label'?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

export function TwinkleIcon({
  name,
  size = 'md',
  className,
  style,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: TwinkleIconProps) {
  const fontSize = size in sizeMap ? sizeMap[size as TwinkleIconSize] : size

  return (
    <i
      className={cn(`tw-icon-${name}`, 'not-italic leading-none shrink-0', className)}
      style={{ fontSize, ...style }}
      aria-hidden={ariaLabel ? undefined : (ariaHidden ?? 'true')}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  )
}
