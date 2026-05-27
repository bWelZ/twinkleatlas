'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Download, FileText, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
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

function imageMaxWidth(aspectRatio: string, physicalSize?: Asset['physicalSize']): string {
  if (physicalSize) {
    const f = physicalSize.unit === 'ft' ? 12 : physicalSize.unit === 'cm' ? 0.394 : 1;
    const maxDim = Math.max(physicalSize.w * f, physicalSize.h * f);
    if (maxDim <= 2.5) return '22%';   // sticker, safety plug — tiny
    if (maxDim <= 12)  return '55%';   // postcard, tabletop sign — medium
    if (maxDim <= 48)  return '80%';   // backdrop, table throw — large
  }
  const [w, h] = aspectRatio.split('/').map(Number);
  if (!w || !h) return '100%';
  const ratio = w / h;
  if (ratio < 0.6)  return '38%';   // 9/16 story — very tall portrait
  if (ratio < 0.85) return '55%';   // 4/5, 3/4 — portrait
  if (ratio < 1.1)  return '65%';   // ~square
  return '100%';                     // landscape — full width
}

function renderInline(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) =>
    part.startsWith('*') && part.endsWith('*')
      ? <strong key={i} className="font-semibold">{part.slice(1, -1)}</strong>
      : <span key={i}>{part}</span>
  );
}

function isBulletLine(l: string) { return /^\s*(•|-)\s/.test(l); }
function isHeadingLine(l: string) { return l.trim().length < 55 && !/[.!?,]$/.test(l.trim()) && !/^\s*(•|-)/.test(l); }

function renderNotes(notes: string) {
  const blocks = notes.split('\n\n').filter(Boolean);
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const lines = block.split('\n').filter(Boolean);

        // Hashtag block
        if (lines.every(l => l.trim().split(/\s+/).every(w => w.startsWith('#')))) {
          return (
            <p key={i} className="text-sm flex flex-wrap gap-x-2 text-muted-foreground">
              {lines.join(' ').split(/\s+/).map((tag, j) => <span key={j}>{tag}</span>)}
            </p>
          );
        }

        // Flow block: single line with multiple → arrows
        if (lines.length === 1 && (lines[0].match(/→/g) || []).length >= 2) {
          const steps = lines[0].split('→').map(s => s.trim()).filter(Boolean);
          return (
            <div key={i} className="flex flex-wrap items-center gap-1.5">
              {steps.map((step, j) => (
                <span key={j} className="flex items-center gap-1.5">
                  <span className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium">{step}</span>
                  {j < steps.length - 1 && <span className="text-muted-foreground text-sm">→</span>}
                </span>
              ))}
            </div>
          );
        }

        // Heading + bullets in same block
        const firstLine = lines[0];
        const restLines = lines.slice(1);
        if (isHeadingLine(firstLine) && restLines.length > 0 && restLines.every(isBulletLine)) {
          return (
            <div key={i} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{firstLine.trim()}</p>
              <ul className="space-y-1.5 pl-1">
                {restLines.map((line, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-base leading-snug">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-foreground/25 shrink-0" />
                    <span>{renderInline(line.replace(/^\s*(•|-)\s*/, ''))}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Pure bullet block
        if (lines.every(isBulletLine)) {
          return (
            <ul key={i} className="space-y-1.5 pl-1">
              {lines.map((line, j) => (
                <li key={j} className="flex items-start gap-2.5 text-base leading-snug">
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-foreground/25 shrink-0" />
                  <span>{renderInline(line.replace(/^\s*(•|-)\s*/, ''))}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Standalone heading (short, no punctuation, starts uppercase)
        if (lines.length === 1 && isHeadingLine(lines[0]) && /^[A-Z]/.test(lines[0].trim())) {
          return (
            <p key={i} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground pt-1">
              {lines[0].trim()}
            </p>
          );
        }

        // Regular paragraph(s)
        return (
          <div key={i} className="space-y-1">
            {lines.map((line, j) => (
              <p key={j} className="text-base leading-relaxed">{renderInline(line)}</p>
            ))}
          </div>
        );
      })}
    </div>
  );
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
            {/* Close controls — inline for text-only and multi-side, floating over image for single visual */}
            {(() => {
              const thumb = asset.printFile?.thumbnailUrl ?? asset.previewUrl ?? null;
              const isTextOnly = !thumb && (asset.type === 'copy' || asset.type === 'email' || asset.type === 'workflow');
              const hasSides = !!(asset.sides && asset.sides.length >= 2);

              const inlineHeader = (
                <div className="flex items-center justify-between px-6 pt-5 pb-0 shrink-0">
                  {assets && assets.length > 1 ? (
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {currentIndex + 1} / {assets.length}
                    </span>
                  ) : <span />}
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/80 transition-colors text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              );

              if (isTextOnly) {
                return inlineHeader;
              }

              if (hasSides) {
                return (
                  <>
                    {inlineHeader}
                    <div className="w-full bg-muted shrink-0 flex items-end justify-center gap-5 px-8 pt-4 pb-3">
                      {asset.sides!.map((side, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                          <img
                            src={side.previewUrl}
                            alt={`${asset.title} — ${side.label}`}
                            className="object-contain w-full"
                            style={{ maxHeight: '50vh', display: 'block' }}
                          />
                          <span className="shrink-0 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {side.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              }

              return (
                <>
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
                  {thumb ? (
                    <div className="w-full bg-muted shrink-0 relative flex items-center justify-center" style={{ minHeight: '160px', maxHeight: '58vh' }}>
                      <img
                        src={thumb}
                        alt={asset.title}
                        className="object-contain"
                        style={{
                          maxHeight: '58vh',
                          maxWidth: imageMaxWidth(asset.aspectRatio, asset.physicalSize),
                          display: 'block',
                        }}
                      />
                      {asset.iframeUrl && (
                        <a
                          href={asset.iframeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 transition-colors"
                        >
                          <Globe className="size-3.5" />
                          {asset.iframeUrl}
                        </a>
                      )}
                    </div>
                  ) : (() => {
                    const mw = imageMaxWidth(asset.aspectRatio, asset.physicalSize);
                    const [w, h] = asset.aspectRatio.split('/').map(Number);
                    const ratio = w && h ? w / h : 1;
                    const swatchH = mw === '100%' ? 220 : Math.round(Math.min(parseInt(mw) / 100 * 560, 320) / ratio);
                    return (
                      <div className="w-full bg-muted shrink-0 flex items-center justify-center" style={{ height: `${Math.max(swatchH, 160)}px` }}>
                        <div className={cn('rounded-xl', asset.previewColor)} style={{ width: mw, aspectRatio: `${w}/${h}`, maxHeight: '280px' }} />
                      </div>
                    );
                  })()}
                </>
              );
            })()}

            {/* Details — scrollable if content is tall */}
            <div className="p-6 overflow-y-auto">
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
                <div className="mt-4">
                  {renderNotes(asset.notes)}
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
