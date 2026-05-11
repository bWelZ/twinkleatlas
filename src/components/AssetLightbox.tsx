'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { Asset } from '@/lib/types';
import { AssetStatusBadge } from '@/components/StatusBadge';
import { assetTypeLabel, formatDate, cn } from '@/lib/utils';

interface AssetLightboxProps {
  asset: Asset | null;
  eventTitle?: string;
  onClose: () => void;
}

export function AssetLightbox({ asset, eventTitle, onClose }: AssetLightboxProps) {
  useEffect(() => {
    if (!asset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [asset, onClose]);

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
          <motion.div
            key="lightbox-content"
            initial={{ scale: 0.93, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.93, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 transition-colors text-white"
            >
              <X className="size-4" />
            </button>

            {/* Color preview block */}
            {(() => {
              const [w, h] = asset.aspectRatio.split('/').map(Number);
              const paddingPercent = h && w ? `${((h / w) * 100).toFixed(2)}%` : '56.25%';
              return (
                <div className="relative w-full" style={{ paddingBottom: paddingPercent }}>
                  <div className={cn('absolute inset-0', asset.previewColor)} />
                </div>
              );
            })()}

            {/* Details */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold leading-tight">{asset.title}</h2>
                  {eventTitle && (
                    <p className="text-sm text-muted-foreground mt-0.5">{eventTitle}</p>
                  )}
                </div>
                <AssetStatusBadge status={asset.status} className="shrink-0 mt-1" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Type</p>
                  <p className="font-medium">{assetTypeLabel(asset.type)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Aspect Ratio</p>
                  <p className="font-medium">{asset.aspectRatio}</p>
                </div>
                {asset.exportDate && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Exported</p>
                    <p className="font-medium">{formatDate(asset.exportDate)}</p>
                  </div>
                )}
              </div>

              {asset.notes && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{asset.notes}</p>
                </div>
              )}

              {asset.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {asset.externalUrl && (
                <div className="mt-4">
                  <a
                    href={asset.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    <ExternalLink className="size-3.5" />
                    View external link
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
