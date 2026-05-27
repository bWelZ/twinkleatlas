'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Users, Target, Building2, ExternalLink,
  ChevronRight, Mail, Link as LinkIcon, FileText, GitBranch,
  Check, Pencil, Printer, Truck, Flag, Eye, Phone, Globe
} from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { AssetLightbox } from '@/components/AssetLightbox';
import { EventStatusBadge, AssetStatusBadge } from '@/components/StatusBadge';
import { getEventById } from '@/lib/data';
import type { Asset } from '@/lib/types';
import {
  cn, formatDate, formatDateShort, companyColor, assetTypeLabel,
  deadlineTypeColor, deadlineTypeBg
} from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const DEADLINE_ICONS: Record<string, React.ElementType> = {
  design: Pencil,
  print: Printer,
  shipping: Truck,
  conference: Flag,
  review: Eye,
  other: ChevronRight,
};

export function EventDetailClient({ id }: { id: string }) {
  const event = getEventById(id);

  const [cmdOpen, setCmdOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState<Asset | null>(null);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Event not found</h2>
            <Link href="/" className="text-violet-600 hover:underline">Back to dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  const deadlinesByMonth: Record<string, typeof event.deadlines> = {};
  for (const dl of event.deadlines) {
    const d = new Date(dl.date + 'T00:00:00');
    const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!deadlinesByMonth[key]) deadlinesByMonth[key] = [];
    deadlinesByMonth[key].push(dl);
  }

  const doneCount = event.deadlines.filter((d) => d.done).length;

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <AssetLightbox asset={lightboxAsset} eventTitle={event.title} onClose={() => setLightboxAsset(null)} />

      {/* Hero */}
      <div className={cn('bg-gradient-to-r relative', event.coverGradient)}>
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative px-4 sm:px-6 lg:px-10 xl:px-14 py-10">
          <div className="flex items-center gap-1.5 text-white/70 text-base mb-4">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <ChevronRight className="size-3" />
            <span className="text-white">{event.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <EventStatusBadge status={event.status} className="bg-white/20 text-white" />
                <span className={cn('text-base font-medium rounded-full px-2 py-0.5', companyColor(event.company))}>
                  {event.company}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                {event.title}
              </h1>
              <p className="text-white/80 text-base mb-4">{event.organization}</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-white/90">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 shrink-0" />
                  <span>{formatDateShort(event.date)}{event.endDate ? ` – ${formatDateShort(event.endDate)}` : ''}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="size-3.5 shrink-0" />
                  <span>{event.audience}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="size-3.5 shrink-0" />
                  <span>{event.presence}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/15 rounded-2xl px-5 py-4 backdrop-blur-sm">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="28" fill="none"
                    stroke="white" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${event.progress * 1.759} 175.9`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base">
                  {event.progress}%
                </span>
              </div>
              <div className="text-white">
                <p className="font-semibold text-base">Progress</p>
                <p className="text-white/70 text-base mt-0.5">{event.assets.length} assets</p>
                <p className="text-white/70 text-base">{doneCount}/{event.deadlines.length} deadlines done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content — full-width layout; sidebar fixed, map/tabs fill remaining space */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left sidebar */}
        <aside className="lg:w-80 xl:w-96 shrink-0 space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="size-4 text-violet-500" />
              <h3 className="font-semibold text-base">Objective</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">{event.objective}</p>
          </div>

          {event.contacts.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-base mb-4">Contacts</h3>
              {(() => {
                const groups = Array.from(new Set(event.contacts.map(c => c.group ?? ''))).filter(Boolean);
                const ungrouped = event.contacts.filter(c => !c.group);
                const hasDetails = (c: typeof event.contacts[0]) => !!(c.role || c.email || c.phone || c.website);
                const ContactRow = ({ c }: { c: typeof event.contacts[0] }) => (
                  <div key={c.name} className={cn('flex gap-3', hasDetails(c) ? 'items-start' : 'items-center')}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-base font-bold shrink-0">
                      {c.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-medium">{c.name}</p>
                      {c.role && <p className="text-base text-muted-foreground">{c.role}</p>}
                      {c.email && (
                        <a href={`mailto:${c.email}`} className="text-base text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 mt-1">
                          <Mail className="size-3" />{c.email}
                        </a>
                      )}
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="text-base text-muted-foreground hover:text-foreground flex items-center gap-1 mt-0.5">
                          <Phone className="size-3" />{c.phone}
                        </a>
                      )}
                      {c.website && (
                        <a href={`https://${c.website}`} target="_blank" rel="noopener noreferrer" className="text-base text-muted-foreground hover:text-foreground flex items-center gap-1 mt-0.5">
                          <Globe className="size-3" />{c.website}
                        </a>
                      )}
                    </div>
                  </div>
                );
                return (
                  <div className="space-y-5">
                    {groups.map((group) => (
                      <div key={group}>
                        <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3">{group}</p>
                        <div className="space-y-2">
                          {event.contacts.filter(c => c.group === group).map(c => <ContactRow key={c.name} c={c} />)}
                        </div>
                      </div>
                    ))}
                    {ungrouped.length > 0 && (
                      <div className="space-y-4">
                        {ungrouped.map(c => <ContactRow key={c.name} c={c} />)}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {event.links.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-base mb-4">Links</h3>
              <div className="space-y-1.5">
                {event.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-base text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    <LinkIcon className="size-3.5 shrink-0" />
                    <span className="truncate">{l.label}</span>
                    <ExternalLink className="size-3 shrink-0 ml-auto" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {event.notes && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-base mb-3">Notes</h3>
              <div className="text-base text-muted-foreground leading-relaxed space-y-3">
                {event.notes.split('\n\n').map((block, i) => {
                  const lines = block.split('\n').filter(Boolean);
                  const bulletLines = lines.filter(l => l.startsWith('- '));
                  const nonBullet = lines.filter(l => !l.startsWith('- '));
                  return (
                    <div key={i}>
                      <div className="space-y-1.5">
                        {nonBullet.map((line, j) => (
                          <p key={j}>{line}</p>
                        ))}
                      </div>
                      {bulletLines.length > 0 && (
                        <ul className="mt-1 space-y-1 list-disc list-inside">
                          {bulletLines.map((line, j) => (
                            <li key={j}>{line.replace(/^- /, '')}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {event.tags.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-base mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span key={tag} className="text-base rounded-full bg-muted px-3 py-1 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main tabs area */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="assets">
            <TabsList className="mb-6">
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            {/* Assets Board Tab */}
            <TabsContent value="assets">
              {(() => {
                const CAT_ORDER = ['social', 'digital', 'booth', 'content', 'operations'] as const;
                const CAT_LABELS: Record<string, string> = { social: 'Social', digital: 'Digital', booth: 'Booth', content: 'Content', operations: 'Operations' };
                const CAT_ACCENT: Record<string, string> = { social: 'border-l-blue-400', digital: 'border-l-violet-400', booth: 'border-l-emerald-400', content: 'border-l-amber-400', operations: 'border-l-rose-400' };
                const CONTENT_ICONS: Record<string, React.ElementType> = { copy: FileText, email: Mail, workflow: GitBranch };

                const getColSpan = (asset: Asset) => {
                  if (asset.category === 'content') return 'col-span-2';
                  const [w, h] = asset.aspectRatio.split('/').map(Number);
                  if (w && h && w / h >= 2.5) return 'col-span-2';
                  return 'col-span-1';
                };

                return (
                  <div className="space-y-10">
                    {CAT_ORDER.map((cat) => {
                      const items = event.assets.filter(a => a.category === cat);
                      if (!items.length) return null;
                      return (
                        <section key={cat}>
                          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                            {CAT_LABELS[cat]}
                            <span className="text-base text-muted-foreground font-normal">{items.length}</span>
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items.map((asset, i) => {
                              const isTextAsset = (asset.category === 'content' || asset.category === 'operations') && !asset.printFile?.thumbnailUrl;
                              const hasThumb = !!asset.printFile?.thumbnailUrl;
                              const maxDimIn = asset.physicalSize ? Math.max(asset.physicalSize.w, asset.physicalSize.h) * (asset.physicalSize.unit === 'ft' ? 12 : 1) : null;
                              const isTiny = maxDimIn !== null && maxDimIn <= 2.5;
                              const ContentIcon = CONTENT_ICONS[asset.type] ?? FileText;
                              const [aw, ah] = asset.aspectRatio.split('/').map(Number);
                              const paddingPct = aw && ah ? `${((ah / aw) * 100).toFixed(2)}%` : '66.67%';

                              return (
                                <motion.div
                                  key={asset.id}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.25, delay: i * 0.03 }}
                                  className={getColSpan(asset)}
                                >
                                  <div
                                    onClick={() => setLightboxAsset(asset)}
                                    className={cn(
                                      'group h-full rounded-2xl border border-border bg-card overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
                                      'border-l-4', CAT_ACCENT[cat],
                                    )}
                                  >
                                    {/* Preview area */}
                                    {isTiny ? (
                                      <div className="w-full flex items-center justify-center bg-muted/30" style={{ height: 160 }}>
                                        {hasThumb
                                          ? <img src={asset.printFile!.thumbnailUrl!} alt={asset.title} className="object-contain rounded" style={{ maxWidth: '32%', maxHeight: '80%' }} />
                                          : <div className={cn('rounded', asset.previewColor)} style={{ width: '32%', aspectRatio: asset.aspectRatio }} />
                                        }
                                      </div>
                                    ) : isTextAsset ? (
                                      <div className="p-4 bg-muted/30 border-b border-border/60">
                                        <div className={cn('flex items-center justify-center w-7 h-7 rounded-lg mb-3', asset.previewColor)}>
                                          <ContentIcon className="size-3.5 text-white" />
                                        </div>
                                        {asset.notes ? (
                                          <p className="text-base leading-relaxed line-clamp-6 whitespace-pre-line">{asset.notes}</p>
                                        ) : (
                                          <div className="space-y-1.5">
                                            <div className="h-2 rounded-full bg-foreground/10 w-full" />
                                            <div className="h-2 rounded-full bg-foreground/10 w-4/5" />
                                            <div className="h-2 rounded-full bg-foreground/10 w-3/5" />
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="relative w-full" style={{ paddingBottom: paddingPct }}>
                                        <div className={cn('absolute inset-0', !hasThumb && asset.previewColor)}>
                                          {hasThumb && <img src={asset.printFile!.thumbnailUrl!} alt={asset.title} className="absolute inset-0 w-full h-full object-cover" />}
                                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 flex items-center justify-center">
                                            <span className="text-white text-base font-medium drop-shadow">View</span>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {/* Footer */}
                                    <div className="p-3">
                                      <div className="flex items-start justify-between gap-2">
                                        <p className="text-base font-medium leading-tight line-clamp-2">{asset.title}</p>
                                        <AssetStatusBadge status={asset.status} className="shrink-0 mt-0.5" />
                                      </div>
                                      <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                                        <span className="text-base text-muted-foreground">{assetTypeLabel(asset.type)}</span>
                                        {asset.physicalSize && (
                                          <span className="text-base text-muted-foreground">· {asset.physicalSize.w}×{asset.physicalSize.h} {asset.physicalSize.unit}</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                );
              })()}
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline">
              {Object.entries(deadlinesByMonth).map(([month, deadlines]) => (
                <div key={month} className="mb-6">
                  <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                    {month}
                  </h3>
                  <div className="space-y-2">
                    {deadlines.map((dl) => {
                      const Icon = DEADLINE_ICONS[dl.type] ?? ChevronRight;
                      const isConference = dl.type === 'conference';
                      return (
                        <motion.div
                          key={dl.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25 }}
                          className={cn(
                            'flex items-center gap-3 rounded-xl p-3',
                            isConference
                              ? 'border-2 border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
                              : 'border border-border bg-card',
                            dl.done && 'opacity-60'
                          )}
                        >
                          <div className={cn('flex items-center justify-center w-8 h-8 rounded-full shrink-0', deadlineTypeBg(dl.type))}>
                            <Icon className={cn('size-4', deadlineTypeColor(dl.type))} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn('text-base font-medium', dl.done && 'line-through text-muted-foreground')}>
                              {dl.title}
                            </p>
                            <p className="text-base text-muted-foreground">
                              {formatDate(dl.date)}
                              <span className="ml-2 capitalize opacity-70">{dl.type}</span>
                            </p>
                          </div>
                          <div className={cn(
                            'flex items-center justify-center w-6 h-6 rounded-md border-2 shrink-0',
                            dl.done
                              ? 'bg-violet-500 border-violet-500 text-white'
                              : 'border-border bg-background'
                          )}>
                            {dl.done && <Check className="size-3.5" />}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
