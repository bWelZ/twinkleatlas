'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Images, LoaderCircle, X, SlidersHorizontal } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { AssetCard } from '@/components/AssetCard';
import { AssetLightbox } from '@/components/AssetLightbox';
import { events } from '@/lib/data';
import type { Asset, AssetStatus, AssetType } from '@/lib/types';
import { assetTypeLabel, companyHex } from '@/lib/utils';

interface AssetWithEvent {
  asset: Asset;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  company: string;
}

const allAssets: AssetWithEvent[] = events.flatMap((e) =>
  e.assets.map((a) => ({
    asset: a,
    eventId: e.id,
    eventTitle: e.title,
    eventDate: e.date,
    company: e.company,
  }))
).sort((a, b) => {
  const aDate = a.asset.exportDate ?? a.eventDate;
  const bDate = b.asset.exportDate ?? b.eventDate;
  return bDate.localeCompare(aDate);
});

const ALL_TYPES = Array.from(new Set(allAssets.map((a) => a.asset.type))).sort() as AssetType[];
const ALL_STATUSES: AssetStatus[] = ['pending', 'in-design', 'review', 'approved', 'delivered'];
const ALL_COMPANIES = Array.from(new Set(allAssets.map((a) => a.company))).sort();
const ALL_EVENTS = events.map((e) => ({ id: e.id, title: e.title }));
const INITIAL_ASSET_COUNT = 24;
const ASSET_LOAD_BATCH = 16;

export default function GalleryPage() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState<{ asset: Asset; eventTitle: string } | null>(null);
  const [filterType, setFilterType] = useState<AssetType | ''>('');
  const [filterStatus, setFilterStatus] = useState<AssetStatus | ''>('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterEvent, setFilterEvent] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_ASSET_COUNT);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    return allAssets.filter(({ asset, eventId, company }) => {
      if (filterType && asset.type !== filterType) return false;
      if (filterStatus && asset.status !== filterStatus) return false;
      if (filterCompany && company !== filterCompany) return false;
      if (filterEvent && eventId !== filterEvent) return false;
      return true;
    });
  }, [filterType, filterStatus, filterCompany, filterEvent]);

  useEffect(() => {
    setVisibleCount(INITIAL_ASSET_COUNT);
  }, [filterType, filterStatus, filterCompany, filterEvent]);

  const visibleAssets = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMoreAssets = visibleCount < filtered.length;
  const loadMoreAssets = useCallback(() => {
    setVisibleCount((count) => Math.min(count + ASSET_LOAD_BATCH, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMoreAssets) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        loadMoreAssets();
      },
      { rootMargin: '600px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMoreAssets, loadMoreAssets, visibleCount]);

  useEffect(() => {
    if (!hasMoreAssets) return;

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = loadMoreRef.current;
        const distanceToLoader = node
          ? node.getBoundingClientRect().top - window.innerHeight
          : document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

        if (distanceToLoader < 600) loadMoreAssets();
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [hasMoreAssets, loadMoreAssets, visibleCount]);

  const hasFilters = filterType || filterStatus || filterCompany || filterEvent;
  const clearFilters = () => {
    setFilterType('');
    setFilterStatus('');
    setFilterCompany('');
    setFilterEvent('');
  };

  return (
    <>
      <Navigation onOpenCommandPalette={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <AssetLightbox
        asset={lightboxAsset?.asset ?? null}
        eventTitle={lightboxAsset?.eventTitle}
        onClose={() => setLightboxAsset(null)}
      />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="py-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700">
              <Images className="size-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Asset Gallery</h1>
          </div>
          <p className="text-muted-foreground text-base">
            {allAssets.length} assets across {events.length} events
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="size-4 text-muted-foreground" />

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
              value={filterEvent}
              onChange={(e) => setFilterEvent(e.target.value)}
              className="h-8 rounded-lg border border-border bg-card px-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-violet-500/30 max-w-48 truncate"
            >
              <option value="">All Events</option>
              {ALL_EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as AssetType | '')}
              className="h-8 rounded-lg border border-border bg-card px-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="">All Types</option>
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>{assetTypeLabel(t)}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AssetStatus | '')}
              className="h-8 rounded-lg border border-border bg-card px-2.5 text-base text-foreground outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="">All Statuses</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            {hasFilters && (
              <>
                <span className="text-base text-muted-foreground">
                  Showing {visibleAssets.length} of {filtered.length} assets
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-base text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                  Clear all
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Gallery */}
        {filtered.length > 0 ? (
          <div className="space-y-8">
            <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {visibleAssets.map(({ asset, eventTitle, company }, i) => (
                <div key={asset.id} className="break-inside-avoid">
                  <div className="relative group">
                    <AssetCard
                      asset={asset}
                      eventTitle={eventTitle}
                      index={i}
                      onClick={() => setLightboxAsset({ asset, eventTitle })}
                    />
                    <div className="absolute top-2 left-2">
                      <span
                        className="text-base rounded-full px-2 py-0.5 font-medium text-white"
                        style={{ backgroundColor: companyHex(company) }}
                      >
                        {company}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div ref={loadMoreRef} className="flex min-h-16 items-center justify-center py-6">
              {hasMoreAssets ? (
                <button
                  type="button"
                  onClick={loadMoreAssets}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-base font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
                >
                  <LoaderCircle className="size-4 animate-spin text-violet-600" />
                  Load more assets
                </button>
              ) : (
                <span className="text-base text-muted-foreground">
                  Showing all {filtered.length} assets
                </span>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Images className="size-9 text-muted-foreground/40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No assets found</h3>
            <p className="text-base text-muted-foreground mb-6">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="rounded-xl bg-violet-600 hover:bg-violet-700 transition-colors text-white text-base font-medium px-4 py-2"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </main>
    </>
  );
}
