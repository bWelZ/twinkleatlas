'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Users, Target, Building2, ExternalLink,
  ChevronRight, Mail, Link as LinkIcon, FileText, GitBranch,
  Check, Pencil, Printer, Truck, Flag, Eye, Phone, Globe,
  ArrowRight, QrCode, Activity, MessageSquare, LayoutGrid,
  ListChecks, Clock,
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

const ASSET_STATUS_DOT: Record<string, string> = {
  pending:    'bg-slate-400',
  'in-design': 'bg-amber-400',
  review:     'bg-blue-400',
  approved:   'bg-emerald-400',
  delivered:  'bg-violet-400',
};

const CAT_ORDER = ['social', 'digital', 'booth'] as const;
const CAT_LABELS: Record<string, string> = { social: 'Social', digital: 'Digital', booth: 'Booth & Print' };
const CAT_ACCENT: Record<string, string> = { social: 'border-l-blue-400', digital: 'border-l-violet-400', booth: 'border-l-emerald-400' };

const TAB = 'flex-none text-base font-semibold px-5 pb-3 pt-1 h-auto rounded-none bg-transparent border-b-[3px] border-transparent -mb-[2px] data-active:border-violet-500 data-active:text-foreground data-active:bg-transparent data-active:shadow-none after:hidden text-muted-foreground hover:text-foreground transition-colors gap-2';

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

  // Deadline grouping
  const deadlinesByMonth: Record<string, typeof event.deadlines> = {};
  for (const dl of event.deadlines) {
    const d = new Date(dl.date + 'T00:00:00');
    const key = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!deadlinesByMonth[key]) deadlinesByMonth[key] = [];
    deadlinesByMonth[key].push(dl);
  }
  const doneCount = event.deadlines.filter((d) => d.done).length;

  // Priority counts from backlog
  const highCount    = event.backlog?.filter(b => b.priority === 'high').length ?? 0;
  const mediumCount  = event.backlog?.filter(b => b.priority === 'medium').length ?? 0;
  const optionalCount = event.backlog?.filter(b => b.priority === 'optional').length ?? 0;

  // Asset splits
  const contentAssets  = event.assets.filter(a => a.category === 'content' || a.type === 'qr');
  const workflowAssets = event.assets.filter(a => a.type === 'workflow');
  const visualAssets   = event.assets.filter(a => a.category !== 'content' && a.type !== 'qr' && a.type !== 'workflow');

  // Next upcoming deadline
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextDeadline = event.deadlines
    .filter(d => !d.done && new Date(d.date + 'T00:00:00') >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null;

  // Match asset to backlog item by title
  const findBacklogItem = (asset: Asset) =>
    event.backlog?.find(b => b.title === asset.title) ?? null;

  // Contacts renderer (reused in overview)
  const ContactsCard = () => {
    if (!event.contacts.length) return null;
    const groups = Array.from(new Set(event.contacts.map(c => c.group ?? ''))).filter(Boolean);
    const ungrouped = event.contacts.filter(c => !c.group);
    const hasDetails = (c: typeof event.contacts[0]) => !!(c.role || c.email || c.phone || c.website);
    const ContactRow = ({ c }: { c: typeof event.contacts[0] }) => (
      <div className={cn('flex gap-3', hasDetails(c) ? 'items-start' : 'items-center')}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-base font-bold shrink-0">
          {c.name[0]}
        </div>
        <div className="min-w-0">
          <p className="text-base font-medium">{c.name}</p>
          {c.role && <p className="text-base text-muted-foreground leading-tight">{c.role}</p>}
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
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-semibold text-base mb-4">Contacts</h3>
        <div className="space-y-5">
          {groups.map(group => (
            <div key={group}>
              <p className="text-base font-semibold text-muted-foreground uppercase tracking-wide mb-3">{group}</p>
              <div className="space-y-4">
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
      </div>
    );
  };

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <AssetLightbox
        asset={lightboxAsset}
        assets={event.assets}
        eventTitle={event.title}
        onClose={() => setLightboxAsset(null)}
        onNavigate={setLightboxAsset}
      />

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
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">{event.title}</h1>
              <p className="text-white/80 text-base mb-4">{event.organization}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-white/90">
                <div className="flex items-center gap-1.5"><MapPin className="size-3.5 shrink-0" /><span>{event.location}</span></div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 shrink-0" />
                  <span>{formatDateShort(event.date)}{event.endDate ? ` – ${formatDateShort(event.endDate)}` : ''}</span>
                </div>
                {event.audience && <div className="flex items-center gap-1.5"><Users className="size-3.5 shrink-0" /><span>{event.audience}</span></div>}
                {event.presence && <div className="flex items-center gap-1.5"><Building2 className="size-3.5 shrink-0" /><span>{event.presence}</span></div>}
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/15 rounded-2xl px-5 py-4 backdrop-blur-sm">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  <circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="6"
                    strokeLinecap="round" strokeDasharray={`${event.progress * 1.759} 175.9`} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base">{event.progress}%</span>
              </div>
              <div className="text-white">
                <p className="font-semibold text-base">Progress</p>
                <p className="text-white/70 text-base mt-0.5">{event.assets.length} assets</p>
                <p className="text-white/70 text-base">{doneCount}/{event.deadlines.length} milestones</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs — full width */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8">
        <Tabs defaultValue="overview">
          <TabsList variant="line" className="mb-8 w-fit border-b-2 border-border rounded-none bg-transparent p-0 h-auto gap-0">
            <TabsTrigger value="overview"    className={TAB}><LayoutGrid   className="size-3.5" />Overview</TabsTrigger>
            <TabsTrigger value="content"     className={TAB}><MessageSquare className="size-3.5" />Content</TabsTrigger>
            <TabsTrigger value="assets"      className={TAB}><ListChecks   className="size-3.5" />Assets</TabsTrigger>
            {workflowAssets.length > 0 && (
              <TabsTrigger value="operations" className={TAB}><Activity     className="size-3.5" />Operations</TabsTrigger>
            )}
            <TabsTrigger value="timeline"    className={TAB}><Clock        className="size-3.5" />Timeline</TabsTrigger>
          </TabsList>

          {/* ─── OVERVIEW ─────────────────────────────────────────── */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left — main content */}
              <div className="lg:col-span-2 space-y-6">

                {/* Progress + priority breakdown */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative w-20 h-20 shrink-0">
                      <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="6" />
                        <circle cx="32" cy="32" r="28" fill="none" stroke="rgb(139,92,246)" strokeWidth="6"
                          strokeLinecap="round" strokeDasharray={`${event.progress * 1.759} 175.9`} />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">{event.progress}%</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-base">Project Progress</h3>
                        <div className="flex items-center gap-3 text-base text-muted-foreground">
                          <span>{event.assets.length} assets</span>
                          <span className="opacity-40">·</span>
                          <span>{doneCount}/{event.deadlines.length} milestones done</span>
                        </div>
                      </div>
                      {event.backlog && event.backlog.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 p-3 text-center">
                            <p className="text-2xl font-bold text-rose-500">{highCount}</p>
                            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">High Priority</p>
                          </div>
                          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 p-3 text-center">
                            <p className="text-2xl font-bold text-amber-500">{mediumCount}</p>
                            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-0.5">Medium</p>
                          </div>
                          <div className="rounded-xl bg-muted p-3 text-center">
                            <p className="text-2xl font-bold text-muted-foreground">{optionalCount}</p>
                            <p className="text-xs text-muted-foreground font-medium mt-0.5">Optional</p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {(['pending', 'in-design', 'review', 'approved'] as const).map(status => {
                            const count = event.assets.filter(a => a.status === status).length;
                            return (
                              <div key={status} className="rounded-xl bg-muted/50 p-2 text-center">
                                <div className={cn('w-2 h-2 rounded-full mx-auto mb-1', ASSET_STATUS_DOT[status])} />
                                <p className="text-xl font-bold">{count}</p>
                                <p className="text-xs text-muted-foreground capitalize">{status.replace('-', ' ')}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Objective */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="size-4 text-violet-500" />
                    <h3 className="font-semibold text-base">Objective</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">{event.objective || 'No objective defined yet.'}</p>
                </div>

                {/* Notes */}
                {event.notes && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-base mb-3">Notes</h3>
                    <div className="text-base text-muted-foreground leading-relaxed space-y-3">
                      {event.notes.split('\n\n').map((block, i) => {
                        const lines = block.split('\n').filter(Boolean);
                        const bulletLines = lines.filter(l => l.startsWith('- '));
                        const nonBullet   = lines.filter(l => !l.startsWith('- '));
                        return (
                          <div key={i}>
                            {nonBullet.length > 0 && (
                              <div className="space-y-1">
                                {nonBullet.map((line, j) => <p key={j}>{line}</p>)}
                              </div>
                            )}
                            {bulletLines.length > 0 && (
                              <ul className="mt-1 space-y-1 list-disc list-inside">
                                {bulletLines.map((line, j) => <li key={j}>{line.replace(/^- /, '')}</li>)}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Asset checklist */}
                {event.assets.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ListChecks className="size-4 text-violet-500" />
                      <h3 className="font-semibold text-base">What's Included</h3>
                      <span className="text-base text-muted-foreground">{event.assets.length} assets</span>
                    </div>
                    <div className="space-y-5">
                      {['social', 'digital', 'booth', 'content', 'operations'].map(cat => {
                        const items = event.assets.filter(a => (a.category ?? 'booth') === cat);
                        if (!items.length) return null;
                        const label = { social: 'Social', digital: 'Digital', booth: 'Booth & Print', content: 'Content', operations: 'Operations' }[cat];
                        return (
                          <div key={cat}>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                              {label} <span className="opacity-60">({items.length})</span>
                            </p>
                            <div className="space-y-0.5">
                              {items.map(asset => (
                                <div
                                  key={asset.id}
                                  className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                                  onClick={() => setLightboxAsset(asset)}
                                >
                                  <div className={cn('w-2 h-2 rounded-full shrink-0', ASSET_STATUS_DOT[asset.status] ?? 'bg-slate-400')} />
                                  <span className="text-base flex-1 truncate group-hover:text-foreground transition-colors">{asset.title}</span>
                                  <AssetStatusBadge status={asset.status} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="space-y-6">

                {/* Next deadline */}
                {nextDeadline && (
                  <div className="rounded-2xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400 mb-2">Next Deadline</p>
                    <p className="font-semibold text-base leading-snug mb-1">{nextDeadline.title}</p>
                    <p className="text-base text-violet-700 dark:text-violet-300 font-medium">{formatDate(nextDeadline.date)}</p>
                  </div>
                )}

                <ContactsCard />

                {event.links.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-semibold text-base mb-4">Links</h3>
                    <div className="space-y-1.5">
                      {event.links.map((l) => (
                        <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
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
              </div>
            </div>
          </TabsContent>

          {/* ─── CONTENT ──────────────────────────────────────────── */}
          <TabsContent value="content">
            {contentAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MessageSquare className="size-10 text-muted-foreground/30 mb-3" />
                <p className="text-base text-muted-foreground">No content assets yet.</p>
              </div>
            ) : (
              <div className="space-y-10">

                {/* Messages & Copy */}
                {(() => {
                  const copyItems = contentAssets.filter(a => a.type !== 'qr');
                  if (!copyItems.length) return null;
                  return (
                    <section>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Messages & Copy</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {copyItems.map((asset, i) => (
                          <motion.div key={asset.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                            <div
                              className="rounded-2xl border border-border bg-card p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-l-amber-400 h-full"
                              onClick={() => setLightboxAsset(asset)}
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', asset.previewColor)}>
                                    {asset.type === 'email' ? <Mail className="size-3.5 text-white" /> : <FileText className="size-3.5 text-white" />}
                                  </div>
                                  <div>
                                    <p className="text-base font-semibold leading-tight">{asset.title}</p>
                                    <p className="text-xs text-muted-foreground capitalize">{assetTypeLabel(asset.type)}</p>
                                  </div>
                                </div>
                                <AssetStatusBadge status={asset.status} className="shrink-0" />
                              </div>
                              {asset.notes && (
                                <p className="text-base text-muted-foreground leading-relaxed line-clamp-6 whitespace-pre-line">
                                  {asset.notes}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  );
                })()}

                {/* Strategic Resources — QR */}
                {(() => {
                  const qrItems = contentAssets.filter(a => a.type === 'qr');
                  if (!qrItems.length) return null;
                  return (
                    <section>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Strategic Resources — QR & Tracking</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {qrItems.map((asset, i) => (
                          <motion.div key={asset.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                            <div
                              className="rounded-2xl border border-border bg-card p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-l-violet-400"
                              onClick={() => setLightboxAsset(asset)}
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-violet-500 shrink-0">
                                    <QrCode className="size-3.5 text-white" />
                                  </div>
                                  <div>
                                    <p className="text-base font-semibold leading-tight">{asset.title}</p>
                                    {asset.physicalSize && (
                                      <p className="text-xs text-muted-foreground">{asset.physicalSize.w}×{asset.physicalSize.h} {asset.physicalSize.unit}</p>
                                    )}
                                  </div>
                                </div>
                                <AssetStatusBadge status={asset.status} className="shrink-0" />
                              </div>
                              {asset.notes && (
                                <p className="text-base text-muted-foreground leading-relaxed line-clamp-4 whitespace-pre-line">
                                  {asset.notes}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  );
                })()}
              </div>
            )}
          </TabsContent>

          {/* ─── ASSETS ───────────────────────────────────────────── */}
          <TabsContent value="assets">
            {visualAssets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ListChecks className="size-10 text-muted-foreground/30 mb-3" />
                <p className="text-base text-muted-foreground">No assets yet.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {CAT_ORDER.map((cat) => {
                  const items = visualAssets.filter(a => a.category === cat);
                  if (!items.length) return null;
                  return (
                    <section key={cat}>
                      <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                        {CAT_LABELS[cat]}
                        <span className="text-base text-muted-foreground font-normal">{items.length}</span>
                      </h3>
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                        {items.map((asset, i) => {
                          const thumb = asset.printFile?.thumbnailUrl ?? asset.previewUrl ?? null;
                          const hasThumb = !!thumb;
                          const backlogItem = findBacklogItem(asset);
                          const showConcept = !hasThumb && (asset.status === 'pending' || asset.status === 'in-design');
                          const [aw, ah] = asset.aspectRatio.split('/').map(Number);
                          const paddingPct = aw && ah ? `${((ah / aw) * 100).toFixed(2)}%` : '66.67%';
                          const maxDimIn = asset.physicalSize ? Math.max(asset.physicalSize.w, asset.physicalSize.h) * (asset.physicalSize.unit === 'ft' ? 12 : 1) : null;
                          const isTiny = maxDimIn !== null && maxDimIn <= 2.5;

                          return (
                            <motion.div
                              key={asset.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: i * 0.03 }}
                              className="break-inside-avoid mb-4"
                            >
                              <div
                                onClick={() => setLightboxAsset(asset)}
                                className={cn(
                                  'group rounded-2xl border border-border bg-card overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
                                  'border-l-4', CAT_ACCENT[cat],
                                )}
                              >
                                {/* Preview / Concept */}
                                {showConcept ? (
                                  <div className="p-4 bg-muted/30 border-b border-border/60">
                                    {backlogItem ? (
                                      <div className="space-y-2">
                                        {backlogItem.headline && (
                                          <p className="text-xs font-semibold text-foreground">{backlogItem.headline}</p>
                                        )}
                                        {backlogItem.direction && backlogItem.direction.length > 0 && (
                                          <ul className="space-y-1">
                                            {backlogItem.direction.slice(0, 4).map((d, j) => (
                                              <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-violet-400 shrink-0" />
                                                {d}
                                              </li>
                                            ))}
                                          </ul>
                                        )}
                                        {backlogItem.missing && backlogItem.missing.length > 0 && (
                                          <div className="pt-1 border-t border-border/40">
                                            <p className="text-xs text-rose-500 font-medium mb-1">Still needed:</p>
                                            {backlogItem.missing.slice(0, 2).map((m, j) => (
                                              <p key={j} className="text-xs text-rose-400">· {m}</p>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ) : asset.notes ? (
                                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-5 whitespace-pre-line">{asset.notes}</p>
                                    ) : (
                                      <div className={cn('rounded-lg w-full', asset.previewColor)} style={{ paddingBottom: paddingPct }} />
                                    )}
                                  </div>
                                ) : isTiny ? (
                                  <div className="w-full flex items-center justify-center bg-muted/30" style={{ height: 160 }}>
                                    {hasThumb
                                      ? <img src={thumb!} alt={asset.title} className="object-contain rounded" style={{ maxWidth: '32%', maxHeight: '80%' }} />
                                      : <div className={cn('rounded', asset.previewColor)} style={{ width: '32%', aspectRatio: asset.aspectRatio }} />
                                    }
                                  </div>
                                ) : (
                                  <div className="relative w-full" style={{ paddingBottom: paddingPct }}>
                                    <div className={cn('absolute inset-0', !hasThumb && asset.previewColor)}>
                                      {hasThumb && <img src={thumb!} alt={asset.title} className="absolute inset-0 w-full h-full object-cover" />}
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
                                      <span className="text-base text-muted-foreground">
                                        · {asset.physicalSize.w}×{asset.physicalSize.h} {asset.physicalSize.unit}
                                      </span>
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

                {/* Uncategorized visual assets */}
                {(() => {
                  const other = visualAssets.filter(a => !a.category || !CAT_ORDER.includes(a.category as typeof CAT_ORDER[number]));
                  if (!other.length) return null;
                  return (
                    <section>
                      <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                        Other <span className="text-base text-muted-foreground font-normal">{other.length}</span>
                      </h3>
                      <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
                        {other.map((asset, i) => {
                          const thumb = asset.printFile?.thumbnailUrl ?? asset.previewUrl ?? null;
                          const hasThumb = !!thumb;
                          const [aw, ah] = asset.aspectRatio.split('/').map(Number);
                          const paddingPct = aw && ah ? `${((ah / aw) * 100).toFixed(2)}%` : '66.67%';
                          return (
                            <motion.div key={asset.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="break-inside-avoid mb-4">
                              <div onClick={() => setLightboxAsset(asset)} className="group rounded-2xl border border-border bg-card overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                                <div className="relative w-full" style={{ paddingBottom: paddingPct }}>
                                  <div className={cn('absolute inset-0', !hasThumb && asset.previewColor)}>
                                    {hasThumb && <img src={thumb!} alt={asset.title} className="absolute inset-0 w-full h-full object-cover" />}
                                  </div>
                                </div>
                                <div className="p-3">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-base font-medium leading-tight line-clamp-2">{asset.title}</p>
                                    <AssetStatusBadge status={asset.status} className="shrink-0 mt-0.5" />
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })()}
              </div>
            )}
          </TabsContent>

          {/* ─── OPERATIONS ───────────────────────────────────────── */}
          {workflowAssets.length > 0 && (
            <TabsContent value="operations">
              <div className="space-y-8">
                {workflowAssets.map((asset, ai) => {
                  const notes = asset.notes ?? '';
                  const blocks = notes.split('\n\n').filter(Boolean);
                  return (
                    <motion.div key={asset.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ai * 0.06 }}>
                      <div className="rounded-2xl border border-border bg-card overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-rose-500 flex items-center justify-center shrink-0">
                              <GitBranch className="size-4 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-base">{asset.title}</p>
                              <p className="text-xs text-muted-foreground">Operations Workflow</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <AssetStatusBadge status={asset.status} />
                            <button
                              onClick={() => setLightboxAsset(asset)}
                              className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                            >
                              View full
                            </button>
                          </div>
                        </div>

                        {/* Parsed content */}
                        <div className="p-6 space-y-6">
                          {blocks.map((block, bi) => {
                            const lines = block.split('\n').filter(Boolean);
                            const first = lines[0] ?? '';

                            // Flow line with arrows
                            if (first.includes('→')) {
                              const labelMatch = first.match(/^([^:]+):\s*/);
                              const label = labelMatch?.[1] ?? null;
                              const flowStr = labelMatch ? first.slice(labelMatch[0].length) : first;
                              const steps = flowStr.split(/\s*→\s*/).map(s => s.trim()).filter(Boolean);
                              return (
                                <div key={bi}>
                                  {label && (
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{label}</p>
                                  )}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {steps.map((step, si) => (
                                      <div key={si} className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-xl px-3 py-2">
                                          <span className="text-xs font-bold text-violet-500">{si + 1}</span>
                                          <span className="text-xs font-medium text-violet-900 dark:text-violet-100">{step}</span>
                                        </div>
                                        {si < steps.length - 1 && <ArrowRight className="size-3.5 text-muted-foreground/60 shrink-0" />}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }

                            // Header + bullets
                            const headerLine  = lines.find(l => !l.startsWith('- ') && !l.startsWith('·'));
                            const bulletLines = lines.filter(l => l.startsWith('- ') || l.startsWith('· '));
                            const isAllBullets = bulletLines.length === lines.length;

                            return (
                              <div key={bi}>
                                {headerLine && !isAllBullets && (
                                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{headerLine}</p>
                                )}
                                {bulletLines.length > 0 && (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {bulletLines.map((b, bj) => (
                                      <div key={bj} className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                                        <span className="text-xs text-foreground leading-tight">{b.replace(/^[-·]\s*/, '')}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {bulletLines.length === 0 && (
                                  <p className="text-base text-muted-foreground leading-relaxed">{block}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          )}

          {/* ─── TIMELINE ─────────────────────────────────────────── */}
          <TabsContent value="timeline">
            {event.deadlines.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Clock className="size-10 text-muted-foreground/30 mb-3" />
                <p className="text-base text-muted-foreground">No timeline yet.</p>
              </div>
            ) : (
              Object.entries(deadlinesByMonth).map(([month, deadlines]) => (
                <div key={month} className="mb-6">
                  <h3 className="text-base font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">{month}</h3>
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
                            dl.done ? 'bg-violet-500 border-violet-500 text-white' : 'border-border bg-background'
                          )}>
                            {dl.done && <Check className="size-3.5" />}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
