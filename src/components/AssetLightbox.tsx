'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Asset } from '@/lib/types';
import { AssetStatusBadge } from '@/components/StatusBadge';
import { assetTypeLabel, formatDate, cn } from '@/lib/utils';

interface AssetLightboxProps {
  asset: Asset | null;
  assets?: Asset[];
  eventTitle?: string;
  onClose: () => void;
  onNavigate?: (asset: Asset) => void;
}

export function AssetLightbox({ asset, assets, eventTitle, onClose, onNavigate }: AssetLightboxProps) {
  const currentIndex = assets && asset ? assets.findIndex(a => a.id === asset.id) : -1;
  const hasPrev = assets && assets.length > 1;
  const hasNext = assets && assets.length > 1;

  const goTo = useCallback((dir: 1 | -1) => {
    if (!assets || assets.length <= 1 || currentIndex < 0 || !onNavigate) return;
    const next = (currentIndex + dir + assets.length) % assets.length;
    onNavigate(assets[next]);
  }, [assets, currentIndex, onNavigate]);

  useEffect(() => {
    if (!asset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo(1);
      if (e.key === 'ArrowLeft') goTo(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [asset, onClose, goTo]);

  return (
    <AnimatePresence>
      {asset && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Prev */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(-1); }}
              className="absolute left-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 transition-colors text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(1); }}
              className="absolute right-3 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 transition-colors text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          )}

          <motion.div
            key={asset.id}
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[92vh] rounded-2xl bg-card border border-border shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close + position indicator */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              {assets && assets.length > 1 && (
                <span className="text-sm text-white/80 bg-black/30 rounded-full px-2.5 py-0.5 tabular-nums">
                  {currentIndex + 1} / {assets.length}
                </span>
              )}
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Preview block — capped height, never overflows viewport */}
            {asset.printFile?.thumbnailUrl ? (
              <div className="w-full bg-muted shrink-0" style={{ maxHeight: '58vh' }}>
                <img
                  src={asset.printFile.thumbnailUrl}
                  alt={asset.title}
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '58vh', display: 'block' }}
                />
              </div>
            ) : (
              <div className={cn('w-full shrink-0', asset.previewColor)} style={{ height: '220px' }} />
            )}

            {/* Details — scrollable if content is tall */}
            <div className="p-5 overflow-y-auto">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold leading-tight">{asset.title}</h2>
                  {eventTitle && (
                    <p className="text-base text-muted-foreground mt-0.5">{eventTitle}</p>
                  )}
                </div>
                <AssetStatusBadge status={asset.status} className="shrink-0 mt-1" />
              </div>

              {/* Inline meta row */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="rounded-md bg-muted px-2.5 py-1 text-base font-medium">{assetTypeLabel(asset.type)}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-base text-muted-foreground">{asset.aspectRatio}</span>
                {asset.category && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-base text-muted-foreground capitalize">{asset.category}</span>
                  </>
                )}
                {asset.exportDate && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-base text-muted-foreground">Exported {formatDate(asset.exportDate)}</span>
                  </>
                )}
              </div>

              {asset.notes && (
                <p className="mt-3 text-base text-muted-foreground leading-relaxed">{asset.notes}</p>
              )}

              {asset.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {asset.tags.map((tag) => (
                    <span key={tag} className="text-base rounded-full bg-muted px-2.5 py-0.5 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(asset.printFile || asset.externalUrl) && (
                <div className="mt-4 flex flex-col gap-2">
                  {asset.printFile && (
                    <div className="rounded-xl border border-border bg-muted/40 p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 shrink-0">
                          <FileText className="size-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-base font-medium truncate">{asset.printFile.filename}</p>
                          {asset.printFile.size && (
                            <p className="text-sm text-muted-foreground">{asset.printFile.size}</p>
                          )}
                        </div>
                      </div>
                      <a
                        href={asset.printFile.url}
                        download={asset.printFile.filename}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-white text-base font-medium px-3 py-1.5 shrink-0"
                      >
                        <Download className="size-3.5" />
                        Download
                      </a>
                    </div>
                  )}
                  {asset.externalUrl && (
                    <a
                      href={asset.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base text-violet-600 dark:text-violet-400 hover:underline"
                    >
                      <ExternalLink className="size-3.5" />
                      View external link
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
