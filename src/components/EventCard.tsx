'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Package } from 'lucide-react';
import Link from 'next/link';
import type { Event } from '@/lib/types';
import { EventStatusBadge } from '@/components/StatusBadge';
import { formatDateShort, daysUntil, companyRainbowPalette, cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const companyColor = companyRainbowPalette(event.company);

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
          <div className="h-32 relative" style={{ backgroundColor: companyColor.light }}>
            <div className="relative p-5 sm:p-6 h-full flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4">
                <EventStatusBadge
                  status={event.status}
                  className="border-0 px-3 py-1 text-base"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${companyColor.regular} 35%, transparent)`,
                    color: companyColor.dark,
                  }}
                />
                <span
                  className="shrink-0 text-base font-medium rounded-full px-3 py-1"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${companyColor.regular} 45%, transparent)`,
                    color: companyColor.dark,
                  }}
                >
                  {event.company}
                </span>
              </div>
              <h3 className="font-bold text-base leading-normal line-clamp-2" style={{ color: companyColor.dark }}>
                {event.title}
              </h3>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5 space-y-4">
            {/* Org */}
            <p className="text-base text-muted-foreground truncate">{event.organization}</p>

            {/* Meta */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <Calendar className="size-3 shrink-0" />
                <span>{formatDateShort(event.date)}</span>
                {event.endDate && (
                  <span>– {formatDateShort(event.endDate)}</span>
                )}
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-base">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{event.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${event.progress}%` }}
                  transition={{ duration: 0.7, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: companyColor.regular }}
                />
              </div>
            </div>

            {/* Footer stats */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-base text-muted-foreground">
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
