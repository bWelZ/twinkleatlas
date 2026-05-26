import type { LucideProps } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Twinkle DS icon sizes mapped to px values:
 *   xs → 12   sm → 16   md → 20 (default)   lg → 24   xl → 32
 *
 * Stroke width follows the Twinkle DS convention of 1.5.
 * Pass any lucide icon as the `icon` prop and it will be rendered
 * with consistent sizing and stroke weight.
 */

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export interface IconProps extends Omit<LucideProps, 'size'> {
  icon: React.ComponentType<LucideProps>
  size?: IconSize | number
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: LucideIcon, size = 'md', strokeWidth = 1.5, className, ...props }, ref) => {
    const resolvedSize = typeof size === 'number' ? size : sizeMap[size]

    return (
      <LucideIcon
        ref={ref}
        size={resolvedSize}
        strokeWidth={strokeWidth}
        className={cn('shrink-0', className)}
        aria-hidden
        focusable={false}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'

export { Icon }
