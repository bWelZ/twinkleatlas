'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { directory } from '@/lib/playbook-data';
import type { DirectoryType } from '@/lib/types';
import { cn } from '@/lib/utils';

const TYPE_META: Record<DirectoryType, { label: string; color: string; bg: string }> = {
  vendor:   { label: 'Vendor',   color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  partner:  { label: 'Partner',  color: 'text-blue-700 dark:text-blue-300',     bg: 'bg-blue-100 dark:bg-blue-900/30' },
  internal: { label: 'Internal', color: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-100 dark:bg-violet-900/30' },
  contact:  { label: 'Contact',  color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
};

export default function VendorsPage() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [filterType, setFilterType] = useState<DirectoryType | ''>('');

  const types = Array.from(new Set(directory.map((d) => d.type))) as DirectoryType[];
  const filtered = filterType ? directory.filter((d) => d.type === filterType) : directory;

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="py-10 sm:py-14"
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Vendors & Contacts</h1>
          <p className="text-muted-foreground text-base mt-1">
            Vendor directory — printers, suppliers, and key contacts.
          </p>
        </motion.section>

        {/* Type filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-sm text-muted-foreground">Type:</span>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterType('')}
              className={cn(
                'text-sm rounded-full px-3 py-1 transition-colors',
                !filterType ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              All
            </button>
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(filterType === t ? '' : t)}
                className={cn(
                  'text-sm rounded-full px-3 py-1 transition-colors',
                  filterType === t ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {TYPE_META[t].label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Directory list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-2xl border border-border bg-card overflow-hidden divide-y divide-border"
        >
          {filtered.map((entry, i) => {
            const meta = TYPE_META[entry.type];
            const initials = entry.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="flex items-start gap-4 px-5 py-4"
              >
                {/* Initials avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-sm font-semibold text-violet-700 dark:text-violet-300">
                  {initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{entry.name}</span>
                    {entry.company && (
                      <span className="text-sm text-muted-foreground">· {entry.company}</span>
                    )}
                    <span className={cn('text-xs font-medium rounded-full px-2 py-0.5', meta.bg, meta.color)}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{entry.role}</p>

                  {entry.services && entry.services.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.services.map((s) => (
                        <span key={s} className="text-xs bg-muted rounded-full px-2 py-0.5 text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">{entry.notes}</p>
                  )}
                </div>

                {/* Contact links */}
                <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                  {entry.email && (
                    <a
                      href={`mailto:${entry.email}`}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="size-3" />
                      <span className="hidden sm:block">{entry.email}</span>
                    </a>
                  )}
                  {entry.phone && (
                    <a
                      href={`tel:${entry.phone}`}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Phone className="size-3" />
                      <span className="hidden sm:block">{entry.phone}</span>
                    </a>
                  )}
                  {entry.website && (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="size-3" />
                      <span className="hidden sm:block truncate max-w-40">
                        {entry.website.replace(/^https?:\/\//, '')}
                      </span>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </>
  );
}
