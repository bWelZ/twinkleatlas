'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Users, Target, Building2, ExternalLink,
  ZoomIn, ZoomOut, RotateCcw, ChevronRight, Mail, Link as LinkIcon,
  Check, Pencil, Printer, Truck, Flag, Eye, Filter, X
} from 'lucide-react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { AssetCard } from '@/components/AssetCard';
import { AssetLightbox } from '@/components/AssetLightbox';
import { EventStatusBadge, AssetStatusBadge } from '@/components/StatusBadge';
import { getEventById } from '@/lib/data';
import type { Asset, AssetStatus, AssetType } from '@/lib/types';
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
  const [zoom, setZoom] = useState(1);
  const [galleryTypeFilter, setGalleryTypeFilter] = useState<AssetType | ''>('');
  const [galleryStatusFilter, setGalleryStatusFilter] = useState<AssetStatus | ''>('');

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMapMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-asset-card]')) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    e.preventDefault();
  }, [pan]);

  const handleMapMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    setPan({ x: panStart.current.panX + dx, y: panStart.current.panY + dy });
  }, []);

  const handleMapMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

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

  const assetTypes = Array.from(new Set(event.assets.map((a) => a.type))) as AssetType[];
  const assetStatuses = Array.from(new Set(event.assets.map((a) => a.status))) as AssetStatus[];

  const filteredGalleryAssets = event.assets.filter((a) => {
    if (galleryTypeFilter && a.type !== galleryTypeFilter) return false;
    if (galleryStatusFilter && a.status !== galleryStatusFilter) return false;
    return true;
  });

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
          <div className="flex items-center gap-1.5 text-white/70 text-xs mb-4">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <ChevronRight className="size-3" />
            <span className="text-white">{event.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <EventStatusBadge status={event.status} className="bg-white/20 text-white" />
                <span className={cn('text-xs font-medium rounded-full px-2 py-0.5', companyColor(event.company))}>
                  {event.company}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2">
                {event.title}
              </h1>
              <p className="text-white/80 text-sm mb-4">{event.organization}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white/90">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 shrink-0" />
                  <span>{formatDateShort(event.date)}{event.endDate ? ` – ${formatDateShort(event.endDate)}` : ''}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="size-3.5 shrink-0" />
                  <span className="truncate">{event.audience.split(',')[0]}</span>
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
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                  {event.progress}%
                </span>
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">Progress</p>
                <p className="text-white/70 text-xs mt-0.5">{event.assets.length} assets</p>
                <p className="text-white/70 text-xs">{doneCount}/{event.deadlines.length} done</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content — full-width layout; sidebar fixed, map/tabs fill remaining space */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-6 flex flex-col lg:flex-row gap-6">
        {/* Left sidebar */}
        <aside className="lg:w-64 xl:w-72 shrink-0 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="size-4 text-violet-500" />
              <h3 className="font-semibold text-sm">Objective</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{event.objective}</p>
          </div>

          {event.contacts.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-semibold text-sm mb-3">Contacts</h3>
              <div className="space-y-3">
                {event.contacts.map((c) => (
                  <div key={c.name} className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {c.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.role}</p>
                      {c.email && (
                        <a
                          href={`mailto:${c.email}`}
                          className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <Mail className="size-3" />
                          {c.email}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {event.links.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-semibold text-sm mb-3">Links</h3>
              <div className="space-y-1.5">
                {event.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:underline"
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
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-semibold text-sm mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{event.notes}</p>
            </div>
          )}

          {event.tags.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="font-semibold text-sm mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((tag) => (
                  <span key={tag} className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main tabs area */}
        <div className="flex-1 min-w-0">
          <Tabs defaultValue="map">
            <TabsList className="mb-5">
              <TabsTrigger value="map">Assets Map</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            {/* Assets Map Tab */}
            <TabsContent value="map" className="w-full">
              <div className="rounded-2xl border border-border overflow-hidden bg-card w-full">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground">
                    {event.assets.length} asset{event.assets.length !== 1 ? 's' : ''} on canvas
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
                      className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    >
                      <ZoomIn className="size-4" />
                    </button>
                    <button
                      onClick={() => setZoom((z) => Math.max(z - 0.2, 0.3))}
                      className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    >
                      <ZoomOut className="size-4" />
                    </button>
                    <button
                      onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                      className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                    <span className="text-xs text-muted-foreground ml-2 tabular-nums">
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>

                <div
                  ref={mapRef}
                  className="relative h-[70vh] min-h-[500px] max-h-[900px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(139,92,246,0.12) 1px, transparent 1px)`,
                    backgroundSize: `${24 * zoom}px ${24 * zoom}px`,
                    backgroundPosition: `${pan.x}px ${pan.y}px`,
                  }}
                  onMouseDown={handleMapMouseDown}
                  onMouseMove={handleMapMouseMove}
                  onMouseUp={handleMapMouseUp}
                  onMouseLeave={handleMapMouseUp}
                >
                  <div
                    style={{
                      transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                      transformOrigin: '0 0',
                      width: 1200,
                      height: 800,
                      position: 'absolute',
                    }}
                  >
                    {event.assets.map((asset) => {
                      const pos = asset.mapPosition ?? { x: 50, y: 50 };
                      return (
                        <motion.div
                          key={asset.id}
                          data-asset-card
                          drag
                          dragMomentum={false}
                          dragElastic={0}
                          initial={false}
                          style={{ x: pos.x, y: pos.y, position: 'absolute' }}
                          className="w-40 rounded-xl border border-border bg-card shadow-md cursor-pointer hover:shadow-lg hover:z-10 transition-shadow"
                          onClick={() => setLightboxAsset(asset)}
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <div className={cn('rounded-t-xl h-10 w-full', asset.previewColor)} />
                          <div className="p-2">
                            <p className="text-xs font-medium line-clamp-2 leading-tight mb-1">
                              {asset.title}
                            </p>
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs text-muted-foreground">{assetTypeLabel(asset.type)}</span>
                              <AssetStatusBadge status={asset.status} />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Filter className="size-4 text-muted-foreground" />
                <select
                  value={galleryTypeFilter}
                  onChange={(e) => setGalleryTypeFilter(e.target.value as AssetType | '')}
                  className="h-8 rounded-lg border border-border bg-card px-2.5 text-sm text-foreground outline-none"
                >
                  <option value="">All Types</option>
                  {assetTypes.map((t) => (
                    <option key={t} value={t}>{assetTypeLabel(t)}</option>
                  ))}
                </select>
                <select
                  value={galleryStatusFilter}
                  onChange={(e) => setGalleryStatusFilter(e.target.value as AssetStatus | '')}
                  className="h-8 rounded-lg border border-border bg-card px-2.5 text-sm text-foreground outline-none"
                >
                  <option value="">All Statuses</option>
                  {assetStatuses.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
                {(galleryTypeFilter || galleryStatusFilter) && (
                  <button
                    onClick={() => { setGalleryTypeFilter(''); setGalleryStatusFilter(''); }}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3" />
                    Clear
                  </button>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {filteredGalleryAssets.length} of {event.assets.length}
                </span>
              </div>

              {filteredGalleryAssets.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                  {filteredGalleryAssets.map((asset, i) => (
                    <div key={asset.id} className="break-inside-avoid">
                      <AssetCard asset={asset} index={i} onClick={() => setLightboxAsset(asset)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-muted-foreground text-sm">No assets match the selected filters.</p>
                  <button
                    onClick={() => { setGalleryTypeFilter(''); setGalleryStatusFilter(''); }}
                    className="mt-3 text-sm text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline">
              {Object.entries(deadlinesByMonth).map(([month, deadlines]) => (
                <div key={month} className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
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
                            <p className={cn('text-sm font-medium', dl.done && 'line-through text-muted-foreground')}>
                              {dl.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
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
