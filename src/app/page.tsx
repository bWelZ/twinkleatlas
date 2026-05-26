'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, SlidersHorizontal, X } from 'lucide-react';
import { TwinkleIcon, type TwinkleIconName } from '@/components/ui/TwinkleIcon';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { EventCard } from '@/components/EventCard';
import { events } from '@/lib/data';
import type { EventStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const ALL_COMPANIES = Array.from(new Set(events.map((e) => e.company))).sort();
const ALL_STATUSES: EventStatus[] = ['planning', 'in-progress', 'ready', 'completed', 'archived'];
const ALL_MONTHS = Array.from(
  new Set(
    events.map((e) => {
      const d = new Date(e.date + 'T00:00:00');
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    })
  )
).sort();

function monthLabel(key: string) {
  const [year, month] = key.split('-');
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function DashboardPage() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMonth, setFilterMonth] = useState('');

  const totalAssets = useMemo(() => events.reduce((s, e) => s + e.assets.length, 0), []);
  const upcomingDeadlines = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events
      .flatMap((e) => e.deadlines)
      .filter((d) => !d.done && new Date(d.date + 'T00:00:00') >= today).length;
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          e.title.toLowerCase().includes(q) ||
          e.organization.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          e.company.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (filterCompany && e.company !== filterCompany) return false;
      if (filterStatus && e.status !== filterStatus) return false;
      if (filterMonth) {
        const d = new Date(e.date + 'T00:00:00');
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (key !== filterMonth) return false;
      }
      return true;
    });
  }, [search, filterCompany, filterStatus, filterMonth]);

  const hasFilters = search || filterCompany || filterStatus || filterMonth;
  const clearFilters = () => {
    setSearch('');
    setFilterCompany('');
    setFilterStatus('');
    setFilterMonth('');
  };

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-16">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="py-10 sm:py-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-md">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Twinkle Atlas</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Visual event & creative asset management
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-8 max-w-lg">
            {[
              { icon: 'calendar' as TwinkleIconName, label: 'Events', value: events.length, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-100 dark:bg-violet-900/30' },
              { icon: 'box' as TwinkleIconName, label: 'Assets', value: totalAssets, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
              { icon: 'calendar-check' as TwinkleIconName, label: 'Deadlines', value: upcomingDeadlines, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
            ].map(({ icon, label, value, color, bg }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-2xl border border-border bg-card p-4 text-center"
              >
                <div className={cn('inline-flex items-center justify-center w-8 h-8 rounded-full mb-2', bg)}>
                  <TwinkleIcon name={icon} size="sm" className={color} />
                </div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Search + Filters */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6 space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events, locations, companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 rounded-xl border border-border bg-card pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 placeholder:text-muted-foreground transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-muted-foreground shrink-0" />
              {/* Company filter */}
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="h-9 rounded-xl border border-border bg-card px-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 text-foreground transition-colors"
              >
                <option value="">All Companies</option>
                {ALL_COMPANIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Status filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-9 rounded-xl border border-border bg-card px-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 text-foreground transition-colors"
              >
                <option value="">All Statuses</option>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>

              {/* Month filter */}
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="hidden sm:block h-9 rounded-xl border border-border bg-card px-2.5 text-sm outline-none focus:ring-2 focus:ring-violet-500/30 text-foreground transition-colors"
              >
                <option value="">All Months</option>
                {ALL_MONTHS.map((m) => (
                  <option key={m} value={m}>{monthLabel(m)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">
                {filtered.length} of {events.length} events
              </span>
              {[
                filterCompany && { label: filterCompany, clear: () => setFilterCompany('') },
                filterStatus && { label: filterStatus, clear: () => setFilterStatus('') },
                filterMonth && { label: monthLabel(filterMonth), clear: () => setFilterMonth('') },
              ]
                .filter(Boolean)
                .map((chip) => {
                  if (!chip) return null;
                  return (
                    <button
                      key={chip.label}
                      onClick={chip.clear}
                      className="flex items-center gap-1 text-xs rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 px-2.5 py-0.5 hover:opacity-80 transition-opacity"
                    >
                      {chip.label}
                      <X className="size-3" />
                    </button>
                  );
                })}
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Clear all
              </button>
            </div>
          )}
        </motion.section>

        {/* Event Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Sparkles className="size-9 text-muted-foreground/40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6">
              No events match your current filters. Try adjusting your search or clearing filters.
            </p>
            <button
              onClick={clearFilters}
              className="rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors text-white text-sm font-medium px-4 py-2"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </main>
    </>
  );
}
