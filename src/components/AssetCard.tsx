'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Asset } from '@/lib/types';
import { AssetStatusBadge } from '@/components/StatusBadge';
import { cn, assetTypeLabel } from '@/lib/utils';

interface AssetCardProps {
  asset: Asset;
  eventTitle?: string;
  onClick?: () => void;
  index?: number;
}

export function AssetCard({ asset, eventTitle, onClick, index = 0 }: AssetCardProps) {
  // Parse aspect ratio to compute padding
  const [w, h] = asset.aspectRatio.split('/').map(Number);
  const paddingPercent = h && w ? `${((h / w) * 100).toFixed(2)}%` : '66.67%';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        'group rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5'
      )}
    >
      {/* Color preview */}
      <div className="relative w-full" style={{ paddingBottom: paddingPercent }}>
        <div className={cn('absolute inset-0', asset.previewColor)}>
          {asset.externalUrl && (
            <a
              href={asset.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="size-3 text-white" />
            </a>
          )}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 flex items-center justify-center">
            <span className="text-white text-xs font-medium">View</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-tight line-clamp-2">{asset.title}</p>
          <AssetStatusBadge status={asset.status} className="shrink-0 mt-0.5" />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{assetTypeLabel(asset.type)}</span>
          {eventTitle && (
            <>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground truncate">{eventTitle}</span>
            </>
          )}
        </div>
        {asset.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {asset.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full bg-muted px-1.5 py-0.5 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
