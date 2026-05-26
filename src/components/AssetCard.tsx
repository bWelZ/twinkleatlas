'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Paperclip, FileText, Mail, GitBranch } from 'lucide-react';
import type { Asset } from '@/lib/types';
import { AssetStatusBadge } from '@/components/StatusBadge';
import { cn, assetTypeLabel } from '@/lib/utils';

interface AssetCardProps {
  asset: Asset;
  eventTitle?: string;
  onClick?: () => void;
  index?: number;
}

const CONTENT_ICONS: Record<string, React.ElementType> = {
  copy: FileText,
  email: Mail,
  workflow: GitBranch,
};

const CATEGORY_ACCENT: Record<string, string> = {
  social:     'border-l-blue-400',
  digital:    'border-l-violet-400',
  booth:      'border-l-emerald-400',
  content:    'border-l-amber-400',
  operations: 'border-l-rose-400',
};

export function AssetCard({ asset, eventTitle, onClick, index = 0 }: AssetCardProps) {
  const hasThumbnail = !!asset.printFile?.thumbnailUrl;
  const isContent = !hasThumbnail && (asset.category === 'content' || asset.category === 'operations');
  const [w, h] = asset.aspectRatio.split('/').map(Number);
  const paddingPercent = h && w ? `${((h / w) * 100).toFixed(2)}%` : '66.67%';
  const ContentIcon = CONTENT_ICONS[asset.type] ?? FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        'group rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-200',
        asset.category && CATEGORY_ACCENT[asset.category] && 'border-l-4',
        asset.category && CATEGORY_ACCENT[asset.category],
        onClick && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5'
      )}
    >
      {isContent ? (
        /* Document-style preview for content/operations assets */
        <div className="relative w-full" style={{ paddingBottom: paddingPercent }}>
          <div className={cn('absolute inset-0 flex flex-col justify-between p-4', asset.previewColor + '/15', 'bg-muted/60')}>
            <div className="flex items-start justify-between">
              <div className={cn('flex items-center justify-center w-9 h-9 rounded-lg', asset.previewColor)}>
                <ContentIcon className="size-4 text-white" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-base font-medium text-muted-foreground">View</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 rounded-full bg-foreground/10 w-full" />
              <div className="h-2 rounded-full bg-foreground/10 w-4/5" />
              <div className="h-2 rounded-full bg-foreground/10 w-3/5" />
            </div>
          </div>
        </div>
      ) : (
        /* Color / thumbnail preview for visual assets */
        <div className="relative w-full" style={{ paddingBottom: paddingPercent }}>
          <div className={cn('absolute inset-0', !asset.printFile?.thumbnailUrl && asset.previewColor)}>
            {asset.printFile?.thumbnailUrl && (
              <img
                src={asset.printFile.thumbnailUrl}
                alt={asset.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
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
              <span className="text-white text-base font-medium">View</span>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-medium leading-tight line-clamp-2">{asset.title}</p>
          <AssetStatusBadge status={asset.status} className="shrink-0 mt-0.5" />
        </div>
        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
          <span className="text-base text-muted-foreground">{assetTypeLabel(asset.type)}</span>
          {asset.printFile && (
            <span className="flex items-center gap-1 text-base text-emerald-600 dark:text-emerald-400 font-medium">
              <Paperclip className="size-3" />
              {asset.printFile.size ?? 'Print file'}
            </span>
          )}
          {eventTitle && (
            <>
              <span className="text-base text-muted-foreground">·</span>
              <span className="text-base text-muted-foreground truncate">{eventTitle}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
