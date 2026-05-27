'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Images, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CommandPalette } from '@/components/CommandPalette';
import { AssetCard } from '@/components/AssetCard';
import { AssetLightbox } from '@/components/AssetLightbox';
import { events } from '@/lib/data';
import type { Asset, AssetStatus, AssetType, AssetCategory } from '@/lib/types';
import { assetTypeLabel, companyHex } from '@/lib/utils';

const CATEGORY_LABELS: Record<AssetCategory, string> = {
  social:     'Social',
  digital:    'Digital',
  booth:      'Booth',
  content:    'Content',
  operations: 'Operations',
};
const CATEGORY_ORDER: AssetCategory[] = ['social', 'digital', 'booth', 'content', 'operations'];

interface AssetWithEvent {
  asset: Asset;
  eventId: string;
  eventTitle: string;
  company: string;
}

const allAssets: AssetWithEvent[] = events.flatMap((e) =>
  e.assets.map((a) => ({
    asset: a,
    eventId: e.id,
    eventTitle: e.title,
    company: e.company,
  }))
);

const ALL_TYPES = Array.from(new Set(allAssets.map((a) => a.asset.type))).sort() as AssetType[];
const ALL_STATUSES: AssetStatus[] = ['pending', 'in-design', 'review', 'approved', 'delivered'];
const ALL_COMPANIES = Array.from(new Set(allAssets.map((a) => a.company))).sort();
const ALL_EVENTS = events.map((e) => ({ id: e.id, title: e.title }));

export default function GalleryPage() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [lightboxAsset, setLightboxAsset] = useState<{ asset: Asset; eventTitle: string } | null>(null);
  const [filterType, setFilterType] = useState<AssetType | ''>('');
  const [filterStatus, setFilterStatus] = useState<AssetStatus | ''>('');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterEvent, setFilterEvent] = useState('');

  const filtered = useMemo(() => {
    return allAssets.filter(({ asset, eventId, company }) => {
      if (filterType && asset.type !== filterType) return false;
      if (filterStatus && asset.status !== filterStatus) return false;
      if (filterCompany && company !== filterCompany) return false;
      if (filterEvent && eventId !== filterEvent) return false;
      return true;
    });
  }, [filterType, filterStatus, filterCompany, filterEvent]);

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
                  {filtered.length} of {allAssets.length} assets
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

        {/* Gallery — grouped by category when present, flat otherwise */}
        {filtered.length > 0 ? (() => {
          const categorized = filtered.filter(a => a.asset.category);
          const uncategorized = filtered.filter(a => !a.asset.category);

          const groups = CATEGORY_ORDER
            .map(cat => ({ cat, items: categorized.filter(a => a.asset.category === cat) }))
            .filter(g => g.items.length > 0);

          return (
            <div className="space-y-10">
              {groups.map(({ cat, items }) => (
                <section key={cat}>
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-base">{CATEGORY_LABELS[cat]}</span>
                    <span className="text-base text-muted-foreground font-normal">{items.length} assets</span>
                  </h2>
                  <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {items.map(({ asset, eventTitle, company }, i) => (
                      <div key={asset.id} className="break-inside-avoid">
                        <div className="relative group">
                          <AssetCard asset={asset} eventTitle={eventTitle} index={i} onClick={() => setLightboxAsset({ asset, eventTitle })} />
                          <div className="absolute top-2 left-2">
                            <span className="text-base rounded-full px-2 py-0.5 font-medium text-white" style={{ backgroundColor: companyHex(company) }}>{company}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {uncategorized.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold mb-4">Other</h2>
                  <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {uncategorized.map(({ asset, eventTitle, company }, i) => (
                      <div key={asset.id} className="break-inside-avoid">
                        <div className="relative group">
                          <AssetCard asset={asset} eventTitle={eventTitle} index={i} onClick={() => setLightboxAsset({ asset, eventTitle })} />
                          <div className="absolute top-2 left-2">
                            <span className="text-base rounded-full px-2 py-0.5 font-medium text-white" style={{ backgroundColor: companyHex(company) }}>{company}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          );
        })() : (
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
