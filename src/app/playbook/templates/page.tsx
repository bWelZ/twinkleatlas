'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { templates } from '@/lib/playbook-data';
import { cn } from '@/lib/utils';

export default function TemplatesPage() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [filterCompany, setFilterCompany] = useState('');

  const companies = Array.from(
    new Set(templates.flatMap((t) => (t.company ? [t.company] : [])))
  ).sort();
  const filtered = filterCompany ? templates.filter((t) => t.company === filterCompany) : templates;

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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground text-base mt-1">
            Reusable design files, print templates, and copy frameworks.
          </p>
        </motion.section>

        {/* Company filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-sm text-muted-foreground">Company:</span>
          <div className="flex gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterCompany('')}
              className={cn(
                'text-sm rounded-full px-3 py-1 transition-colors',
                !filterCompany ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
              )}
            >
              All
            </button>
            {companies.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCompany(filterCompany === c ? '' : c)}
                className={cn(
                  'text-sm rounded-full px-3 py-1 transition-colors',
                  filterCompany === c ? 'bg-violet-600 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tmpl, i) => (
            <motion.div
              key={tmpl.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04, ease: 'easeOut' }}
              className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-snug">{tmpl.title}</h3>
                  {(tmpl.externalUrl || tmpl.downloadUrl) && (
                    <a
                      href={tmpl.externalUrl || tmpl.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </div>
                {tmpl.company && (
                  <span className="text-xs text-muted-foreground">{tmpl.company}</span>
                )}
              </div>

              {tmpl.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">{tmpl.description}</p>
              )}

              <div className="flex flex-wrap gap-1 mt-auto">
                {tmpl.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground"
                  >
                    <Tag className="size-2.5" />
                    {tag}
                  </span>
                ))}
              </div>

              {tmpl.lastUpdated && (
                <p className="text-xs text-muted-foreground/60">
                  Updated{' '}
                  {new Date(tmpl.lastUpdated + 'T00:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}

              {!tmpl.externalUrl && !tmpl.downloadUrl && (
                <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-2.5 py-1.5">
                  Link not yet added
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}
