'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays, Pencil, Printer, Truck, Flag, Eye,
  ChevronRight, Check, Filter
} from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { events } from '@/lib/data';
import type { EventDeadline } from '@/lib/types';
import {
  cn, formatDate, formatDateShort, deadlineTypeColor, deadlineTypeBg, companyColor, getMonthKey
} from '@/lib/utils';

interface DeadlineItem extends EventDeadline {
  eventId: string;
  eventTitle: string;
  eventGradient: string;
  company: string;
}

const DEADLINE_ICONS: Record<string, React.ElementType> = {
  design: Pencil,
  print: Printer,
  shipping: Truck,
  conference: Flag,
  review: Eye,
  other: ChevronRight,
};

const allDeadlines: DeadlineItem[] = events
  .flatMap((e) =>
    e.deadlines.map((d) => ({
      ...d,
      eventId: e.id,
      eventTitle: e.title,
      eventGradient: e.coverGradient,
      company: e.company,
    }))
  )
  .sort((a, b) => a.date.localeCompare(b.date));

const ALL_COMPANIES = Array.from(new Set(events.map((e) => e.company))).sort();
const ALL_TYPES = ['design', 'print', 'shipping', 'conference', 'review', 'other'] as const;

export default function TimelinePage() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [filterCompany, setFilterCompany] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showDone, setShowDone] = useState(true);

  const filtered = useMemo(() => {
    return allDeadlines.filter((d) => {
      if (filterCompany && d.company !== filterCompany) return false;
      if (filterType && d.type !== filterType) return false;
      if (!showDone && d.done) return false;
      return true;
    });
  }, [filterCompany, filterType, showDone]);

  // Group by month
  const byMonth = useMemo(() => {
    const map: Record<string, DeadlineItem[]> = {};
    for (const dl of filtered) {
      const key = getMonthKey(dl.date);
      if (!map[key]) map[key] = [];
      map[key].push(dl);
    }
    return map;
  }, [filtered]);

  const monthKeys = Object.keys(byMonth).sort();

  function monthLabel(key: string) {
    const [year, month] = key.split('-');
    const d = new Date(Number(year), Number(month) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  const doneCount = allDeadlines.filter((d) => d.done).length;
  const conferenceCount = allDeadlines.filter((d) => d.type === 'conference').length;

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700">
              <CalendarDays className="size-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Global Timeline</h1>
          </div>
          <p className="text-muted-foreground text-base">
            {allDeadlines.length} deadlines across {events.length} events — {conferenceCount} conferences, {doneCount} completed
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-6 flex items-center gap-2 flex-wrap"
        >
          <Filter className="size-4 text-muted-foreground" />

          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="h-8 rounded-lg border border-border bg-card px-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-violet-500/30"
          >
            <option value="">All Companies</option>
            {ALL_COMPANIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-8 rounded-lg border border-border bg-card px-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-violet-500/30"
          >
            <option value="">All Types</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-1.5 cursor-pointer select-none ml-1">
            <div
              onClick={() => setShowDone((v) => !v)}
              className={cn(
                'flex items-center justify-center w-4 h-4 rounded border-2 transition-colors',
                showDone
                  ? 'border-violet-500 bg-violet-500'
                  : 'border-border bg-background'
              )}
            >
              {showDone && <Check className="size-2.5 text-white" />}
            </div>
            <span className="text-base text-muted-foreground">Show completed</span>
          </label>

          <span className="ml-auto text-base text-muted-foreground">
            {filtered.length} of {allDeadlines.length} deadlines
          </span>
        </motion.div>

        {/* Timeline */}
        {monthKeys.length > 0 ? (
          <div className="space-y-8">
            {monthKeys.map((monthKey, mi) => {
              const deadlines = byMonth[monthKey];
              return (
                <motion.section
                  key={monthKey}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: mi * 0.06 }}
                >
                  {/* Month header */}
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-base font-semibold text-muted-foreground uppercase tracking-wider">
                      {monthLabel(monthKey)}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-base text-muted-foreground">
                      {deadlines.length} items
                    </span>
                  </div>

                  {/* Deadline items */}
                  <div className="space-y-2">
                    {deadlines.map((dl, i) => {
                      const Icon = DEADLINE_ICONS[dl.type] ?? ChevronRight;
                      const isConference = dl.type === 'conference';

                      return (
                        <motion.div
                          key={`${dl.eventId}-${dl.id}`}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.03 }}
                          className={cn(
                            'flex items-center gap-3 rounded-xl p-3',
                            isConference
                              ? 'border-2 border-emerald-400/60 dark:border-emerald-600/60 bg-emerald-50 dark:bg-emerald-900/10'
                              : 'border border-border bg-card',
                            dl.done && 'opacity-55'
                          )}
                        >
                          {/* Type icon */}
                          <div className={cn(
                            'flex items-center justify-center w-9 h-9 rounded-full shrink-0',
                            deadlineTypeBg(dl.type)
                          )}>
                            <Icon className={cn('size-4', deadlineTypeColor(dl.type))} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className={cn(
                                'text-base font-medium',
                                dl.done && 'line-through text-muted-foreground'
                              )}>
                                {dl.title}
                              </p>
                              {isConference && (
                                <span className="text-base rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 font-medium shrink-0">
                                  Conference
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-base text-muted-foreground">
                              <span>{formatDateShort(dl.date)}</span>
                              <span>·</span>
                              <Link
                                href={`/events/${dl.eventId}`}
                                className="truncate hover:text-violet-600 dark:hover:text-violet-400 transition-colors max-w-xs"
                              >
                                {dl.eventTitle}
                              </Link>
                            </div>
                          </div>

                          {/* Company + done */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={cn(
                              'hidden sm:inline-flex text-base rounded-full px-2 py-0.5 font-medium',
                              companyColor(dl.company)
                            )}>
                              {dl.company}
                            </span>
                            <div className={cn(
                              'flex items-center justify-center w-6 h-6 rounded-md border-2 shrink-0',
                              dl.done
                                ? 'bg-violet-500 border-violet-500 text-white'
                                : 'border-border bg-background'
                            )}>
                              {dl.done && <Check className="size-3.5" />}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <CalendarDays className="size-9 text-muted-foreground/40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No deadlines found</h3>
            <p className="text-base text-muted-foreground">
              Try adjusting your filters to see more items.
            </p>
          </motion.div>
        )}
      </main>
    </>
  );
}
