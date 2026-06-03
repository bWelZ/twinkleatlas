'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Lightbulb, Megaphone, Rocket, X } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { guidelines } from '@/lib/playbook-data';
import { events } from '@/lib/data';
import { cn, effectiveEventStatus, formatDateShort } from '@/lib/utils';
import { companyCopyHistoryHref, companyPlaybookHref } from '@/lib/playbook-routes';
import { getCopyHistoryForCompany } from '@/lib/copy-history';
import type { MessageMode } from '@/lib/types';

const MODE_META: Record<MessageMode, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
  selling: { icon: Megaphone, color: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200 dark:border-violet-800' },
  gratitude: { icon: Heart, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800' },
  awareness: { icon: Lightbulb, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
  launch: { icon: Rocket, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
};

function ModeCard({ mode }: { mode: (typeof guidelines)[0]['modes'][0] }) {
  const meta = MODE_META[mode.mode];
  const Icon = meta.icon;

  return (
    <div className={cn('rounded-2xl border overflow-hidden bg-card', meta.border)}>
      <div className={cn('flex items-start gap-3 p-4', meta.bg)}>
        <Icon className={cn('size-4 mt-1 shrink-0', meta.color)} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-sm">{mode.label}</span>
            <span className={cn('text-xs font-medium rounded-full px-2 py-0.5 bg-white/60 dark:bg-black/20', meta.color)}>
              {mode.mode}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{mode.description}</p>
        </div>
      </div>
      <div className="p-4 space-y-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-muted/50 p-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tone</p>
            <p className="text-sm">{mode.tone}</p>
          </div>
          {mode.headline && (
            <div className="rounded-xl bg-muted/50 p-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Headline</p>
              <p className="text-sm font-medium">&quot;{mode.headline}&quot;</p>
            </div>
          )}
          {mode.cta && (
            <div className="rounded-xl bg-muted/50 p-3 sm:col-span-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">CTAs</p>
              <p className="text-sm">{mode.cta}</p>
            </div>
          )}
        </div>
        {mode.contexts.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {mode.contexts.map((context) => (
              <span key={context} className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                {context}
              </span>
            ))}
          </div>
        )}
        {mode.examples.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Copy Examples</p>
            {mode.examples.map((example, index) => (
              <div key={`${example.channel}-${index}`} className="rounded-xl border border-border bg-background p-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1">{example.channel}</p>
                <p className="text-sm leading-relaxed">{example.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CompanyGuidelinesPage({ company }: { company: string }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const guideline = guidelines.find((item) => item.company === company) ?? guidelines[0];
  const copyHistory = getCopyHistoryForCompany(guideline.company);
  const companyEvents = events
    .filter((event) => effectiveEventStatus(event) !== 'archived')
    .filter((event) => event.company === guideline.company || event.company.includes(guideline.company) || (guideline.company === 'WELS' && event.company === 'WELS / Zipdata'));

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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Guidelines</h1>
          <p className="text-muted-foreground text-base mt-1">Brand voice, key messages, and copy examples by company.</p>
        </motion.section>

        <div className="flex gap-1 mb-10 border-b border-border overflow-x-auto">
          {guidelines.map((item) => {
            const active = item.company === guideline.company;
            return (
              <Link
                key={item.company}
                href={companyPlaybookHref(item.company)}
                className={cn('flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative whitespace-nowrap', active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                {item.company}
                {active && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: item.color }} />}
              </Link>
            );
          })}
        </div>

        <motion.div
          key={guideline.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="space-y-8"
        >
          <section>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: guideline.color }} />
              <h2 className="text-lg font-bold">{guideline.company}</h2>
            </div>
            {guideline.tagline && <p className="text-base text-muted-foreground italic ml-5">{guideline.tagline}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 ml-5">
              {guideline.mission && (
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Mission</p>
                  <p className="text-sm leading-relaxed">{guideline.mission}</p>
                </div>
              )}
              {guideline.audience && (
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Audience</p>
                  <p className="text-sm leading-relaxed">{guideline.audience}</p>
                </div>
              )}
              {companyEvents.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-3 sm:col-span-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Events</p>
                  <div className="space-y-1.5">
                    {companyEvents.map((event) => (
                      <Link key={event.id} href={`/events/${event.id}`} className="flex items-center gap-2 group rounded-lg hover:bg-muted/60 px-2 py-1.5 -mx-2 transition-colors">
                        <span className="text-sm font-medium flex-1 truncate group-hover:text-foreground transition-colors">{event.title}</span>
                        <span className="text-xs text-muted-foreground shrink-0">{formatDateShort(event.date)}</span>
                        <ArrowRight className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Tone of Voice</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {guideline.toneDescriptors.map((descriptor) => (
                <span key={descriptor} className="rounded-full border px-3 py-1 text-sm font-medium" style={{ borderColor: guideline.color + '60', color: guideline.color, backgroundColor: guideline.color + '12' }}>
                  {descriptor}
                </span>
              ))}
            </div>
            {guideline.toneAvoid && guideline.toneAvoid.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {guideline.toneAvoid.map((descriptor) => (
                  <span key={descriptor} className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground flex items-center gap-1.5">
                    <X className="size-3 text-destructive/60" />
                    {descriptor}
                  </span>
                ))}
              </div>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Key Messages</h3>
            <ul className="space-y-2">
              {guideline.messages.map((message, index) => (
                <li key={message} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: guideline.color }}>
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed pt-0.5">{message}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Headlines & CTAs</h3>
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Primary Headline</p>
                <p className="text-base font-semibold">&quot;{guideline.headlines.primary}&quot;</p>
              </div>
              {guideline.headlines.variations && guideline.headlines.variations.length > 0 && (
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Variations</p>
                  <ul className="space-y-1.5">
                    {guideline.headlines.variations.map((variation) => (
                      <li key={variation} className="text-sm text-muted-foreground">&quot;{variation}&quot;</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {guideline.ctas.map((cta) => (
                  <span key={cta} className="rounded-full border px-3 py-1.5 text-sm font-medium" style={{ borderColor: guideline.color + '80', color: guideline.color }}>
                    {cta}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Marketing Memory</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {copyHistory.length} textos, frases y direcciones usados en eventos/campañas anteriores.
                </p>
              </div>
              <Link href={companyCopyHistoryHref(guideline.company)} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">
                Ver historial
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Messaging by Context</h3>
            <div className="space-y-3">
              {guideline.modes.map((mode) => (
                <ModeCard key={`${guideline.id}-${mode.mode}-${mode.label}`} mode={mode} />
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    </>
  );
}
