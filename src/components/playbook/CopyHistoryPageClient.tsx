'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { guidelines } from '@/lib/playbook-data';
import { companyPlaybookHref } from '@/lib/playbook-routes';
import { getCopyHistoryForCompany } from '@/lib/copy-history';
import { cn, formatDateShort } from '@/lib/utils';

export function CopyHistoryPageClient({ company }: { company: string }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [query, setQuery] = useState('');
  const guideline = guidelines.find((item) => item.company === company) ?? guidelines[0];
  const allEntries = getCopyHistoryForCompany(company);
  const q = query.trim().toLowerCase();
  const entries = q
    ? allEntries.filter((entry) =>
        [entry.eventTitle, entry.sourceTitle, entry.sourceType, entry.text, entry.tags.join(' ')].join(' ').toLowerCase().includes(q)
      )
    : allEntries;

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 pb-16">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="py-10 sm:py-14"
        >
          <Link href={companyPlaybookHref(company)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5">
            <ArrowLeft className="size-4" />
            Back to {company} guidelines
          </Link>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: guideline.color }} />
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{company}</p>
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">Marketing Copy History</h1>
          <p className="text-muted-foreground text-base mt-2 max-w-2xl">
            Frases, headlines, CTAs, captions, talking points y direcciones usadas en eventos anteriores para entender el estilo que Carlos ha venido aprobando.
          </p>
        </motion.section>

        <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search copy, events, CTAs, social captions..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{entries.length}</span> of {allEntries.length} entries.
        </p>

        <div className="space-y-4">
          {entries.map((entry, index) => (
            <motion.article
              key={`${entry.id}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.025, 0.25) }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{entry.sourceType}</p>
                  <h2 className="mt-1 text-base font-semibold">{entry.sourceTitle}</h2>
                  <Link href={`/events/${entry.eventId}`} className="mt-1 inline-flex text-sm text-muted-foreground hover:text-foreground">
                    {entry.eventTitle} · {formatDateShort(entry.eventDate)}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1 sm:justify-end">
                  {entry.tags.slice(0, 5).map((tag) => (
                    <span key={tag} className={cn('rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground', tag === 'copy' && 'text-foreground')}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 whitespace-pre-wrap rounded-xl bg-muted/45 p-4 text-sm leading-relaxed">{entry.text}</div>
            </motion.article>
          ))}
        </div>

        {entries.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-semibold">No copy found for this search.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try another keyword or add more event/image notes to Atlas.</p>
          </div>
        )}
      </main>
    </>
  );
}
