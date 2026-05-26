import { cn, eventStatusColor, eventStatusLabel, assetStatusColor, assetStatusLabel } from '@/lib/utils';
import type { EventStatus, AssetStatus } from '@/lib/types';

interface EventStatusBadgeProps {
  status: EventStatus;
  className?: string;
}

export function EventStatusBadge({ status, className }: EventStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium',
        eventStatusColor(status),
        className
      )}
    >
      {eventStatusLabel(status)}
    </span>
  );
}

interface AssetStatusBadgeProps {
  status: AssetStatus;
  className?: string;
}

export function AssetStatusBadge({ status, className }: AssetStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium',
        assetStatusColor(status),
        className
      )}
    >
      {assetStatusLabel(status)}
    </span>
  );
}
