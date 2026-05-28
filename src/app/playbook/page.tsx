'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Megaphone, Heart, Lightbulb, Rocket, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { guidelines } from '@/lib/playbook-data';
import { events } from '@/lib/data';
import type { MessageMode } from '@/lib/types';
import { cn, formatDateShort } from '@/lib/utils';

const MODE_META: Record<MessageMode, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string }> = {
  selling:   { icon: Megaphone, color: 'text-violet-700 dark:text-violet-300', bg: 'bg-violet-50 dark:bg-violet-900/20',  border: 'border-violet-200 dark:border-violet-800' },
  gratitude: { icon: Heart,     color: 'text-rose-600 dark:text-rose-400',     bg: 'bg-rose-50 dark:bg-rose-900/20',      border: 'border-rose-200 dark:border-rose-800' },
  awareness: { icon: Lightbulb, color: 'text-amber-600 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-900/20',    border: 'border-amber-200 dark:border-amber-800' },
  launch:    { icon: Rocket,    color: 'text-blue-600 dark:text-blue-400',     bg: 'bg-blue-50 dark:bg-blue-900/20',      border: 'border-blue-200 dark:border-blue-800' },
};

function ModeCard({ mode }: { mode: (typeof guidelines)[0]['modes'][0] }) {
  const [open, setOpen] = useState(false);
  const meta = MODE_META[mode.mode];
  const Icon = meta.icon;

  return (
    <div className={cn('rounded-2xl border overflow-hidden', meta.border)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn('w-full flex items-start gap-3 p-4 text-left transition-colors', meta.bg, 'hover:opacity-90')}
      >
        <div className="mt-0.5 flex-shrink-0">
          <Icon className={cn('size-4 mt-1', meta.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{mode.label}</span>
            <span className={cn('text-xs font-medium rounded-full px-2 py-0.5 bg-white/60 dark:bg-black/20', meta.color)}>
              {mode.mode}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{mode.description}</p>
          {mode.contexts.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {mode.contexts.map((c) => (
                <span key={c} className="text-xs rounded-full bg-white/70 dark:bg-black/20 px-2 py-0.5 text-muted-foreground">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 mt-1 text-muted-foreground">
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-4 space-y-4 border-t border-border bg-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tone</p>
                  <p className="text-sm">{mode.tone}</p>
                </div>
                {mode.headline && (
                  <div className="rounded-xl bg-muted/50 p-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Headline</p>
                    <p className="text-sm font-medium">"{mode.headline}"</p>
                  </div>
                )}
                {mode.cta && (
                  <div className="rounded-xl bg-muted/50 p-3 sm:col-span-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">CTAs</p>
                    <p className="text-sm">{mode.cta}</p>
                  </div>
                )}
              </div>

              {mode.examples.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Copy Examples</p>
                  <div className="space-y-2">
                    {mode.examples.map((ex, i) => (
                      <div key={i} className="rounded-xl border border-border bg-background p-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">{ex.channel}</p>
                        <p className="text-sm leading-relaxed">{ex.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GuidelinesContent() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const companies = guidelines.map((g) => g.company);
  const paramCompany = searchParams.get('company');
  const [activeCompany, setActiveCompany] = useState(
    paramCompany && companies.includes(paramCompany) ? paramCompany : companies[0]
  );

  useEffect(() => {
    const c = searchParams.get('company');
    if (c && companies.includes(c)) setActiveCompany(c);
  }, [searchParams]);

  function switchCompany(company: string) {
    setActiveCompany(company);
    router.replace(`/playbook?company=${encodeURIComponent(company)}`, { scroll: false });
  }

  const g = guidelines.find((x) => x.company === activeCompany) ?? guidelines[0];

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
          <p className="text-muted-foreground text-base mt-1">
            Brand voice, key messages, and copy examples by company.
          </p>
        </motion.section>

        {/* Company tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-1 mb-10 border-b border-border"
        >
          {companies.map((company) => {
            const cx = guidelines.find((x) => x.company === company)!;
            const active = company === activeCompany;
            return (
              <button
                key={company}
                onClick={() => switchCompany(company)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cx.color }} />
                {company}
                {active && (
                  <motion.div
                    layoutId="company-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: cx.color }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Company content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-8"
          >
            {/* Brand overview */}
            <section>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                <h2 className="text-lg font-bold">{g.company}</h2>
              </div>
              {g.tagline && <p className="text-base text-muted-foreground italic ml-5">{g.tagline}</p>}

              {(g.mission || g.audience) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 ml-5">
                  {g.mission && (
                    <div className="rounded-xl border border-border bg-card p-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Mission</p>
                      <p className="text-sm leading-relaxed">{g.mission}</p>
                    </div>
                  )}
                  {g.audience && (
                    <div className="rounded-xl border border-border bg-card p-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Audience</p>
                      <p className="text-sm leading-relaxed">{g.audience}</p>
                    </div>
                  )}
                  {(() => {
                    const companyEvents = events.filter(e =>
                      e.company === g.company ||
                      e.company.includes(g.company) ||
                      (g.company !== 'PreK.Club' && e.company === 'WELS / Zipdata' && g.company === 'WELS')
                    ).filter(e => e.status !== 'archived');
                    if (!companyEvents.length) return null;
                    return (
                      <div className="rounded-xl border border-border bg-card p-3 sm:col-span-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Events</p>
                        <div className="space-y-1.5">
                          {companyEvents.map(e => (
                            <Link
                              key={e.id}
                              href={`/events/${e.id}`}
                              className="flex items-center gap-2 group rounded-lg hover:bg-muted/60 px-2 py-1.5 -mx-2 transition-colors"
                            >
                              <span className="text-sm font-medium flex-1 truncate group-hover:text-foreground transition-colors">{e.title}</span>
                              <span className="text-xs text-muted-foreground shrink-0">{formatDateShort(e.date)}</span>
                              <ArrowRight className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </section>

            {/* Tone of voice */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Tone of Voice</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {g.toneDescriptors.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border px-3 py-1 text-sm font-medium"
                    style={{ borderColor: g.color + '60', color: g.color, backgroundColor: g.color + '12' }}
                  >
                    {d}
                  </span>
                ))}
              </div>
              {g.toneAvoid && g.toneAvoid.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {g.toneAvoid.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-muted-foreground flex items-center gap-1.5"
                    >
                      <X className="size-3 text-destructive/60" />
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </section>

            {/* Key messages */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Key Messages</h3>
              <ul className="space-y-2">
                {g.messages.map((msg, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: g.color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed pt-0.5">{msg}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Headlines & CTAs */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Headlines & CTAs</h3>
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Primary Headline</p>
                  <p className="text-base font-semibold">"{g.headlines.primary}"</p>
                </div>
                {g.headlines.variations && g.headlines.variations.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Variations</p>
                    <ul className="space-y-1.5">
                      {g.headlines.variations.map((v, i) => (
                        <li key={i} className="text-sm text-muted-foreground">"{v}"</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {g.ctas.map((cta) => (
                    <span
                      key={cta}
                      className="rounded-full border px-3 py-1.5 text-sm font-medium"
                      style={{ borderColor: g.color + '80', color: g.color }}
                    >
                      {cta}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Modes */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">Messaging by Context</h3>
              <div className="space-y-3">
                {g.modes.map((mode, i) => (
                  <ModeCard key={i} mode={mode} />
                ))}
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}

export default function GuidelinesPage() {
  return (
    <Suspense>
      <GuidelinesContent />
    </Suspense>
  );
}
