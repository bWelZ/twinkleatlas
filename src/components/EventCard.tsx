'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Package } from 'lucide-react';
import Link from 'next/link';
import type { Event } from '@/lib/types';
import { EventStatusBadge } from '@/components/StatusBadge';
import { formatDateShort, daysUntil, companyColor, cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const nextDeadline = event.deadlines
    .filter((d) => !d.done)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const days = nextDeadline ? daysUntil(nextDeadline.date) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/events/${event.id}`} className="block group">
        <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-shadow duration-200 group-hover:shadow-md">
          {/* Gradient header */}
          <div className={cn('bg-gradient-to-r h-24 relative', event.coverGradient)}>
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative p-4 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between gap-2">
                <EventStatusBadge status={event.status} className="bg-white/20 text-white border-0" />
                <span className={cn('text-base font-medium rounded-full px-2 py-0.5', companyColor(event.company))}>
                  {event.company}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base leading-tight line-clamp-2">
                {event.title}
              </h3>
            </div>
          </div>

          {/* Card body */}
          <div className="p-4 space-y-3">
            {/* Org */}
            <p className="text-base text-muted-foreground truncate">{event.organization}</p>

            {/* Meta */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-base text-muted-foreground">
                <Calendar className="size-3 shrink-0" />
                <span>{formatDateShort(event.date)}</span>
                {event.endDate && (
                  <span>– {formatDateShort(event.endDate)}</span>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{event.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${event.progress}%` }}
                  transition={{ duration: 0.7, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
                  className={cn('h-full rounded-full bg-gradient-to-r', event.coverGradient)}
                />
              </div>
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-base text-muted-foreground">
                <Package className="size-3" />
                <span>{event.assets.length} asset{event.assets.length !== 1 ? 's' : ''}</span>
              </div>
              {nextDeadline && (
                <span
                  className={cn(
                    'text-base rounded-full px-2 py-0.5',
                    days !== null && days <= 7
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : days !== null && days <= 21
                      ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {days !== null && days < 0
                    ? 'Overdue'
                    : days === 0
                    ? 'Due today'
                    : `${days}d left`}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
