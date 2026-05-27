'use client';

import { motion } from 'framer-motion';
import { Circle, CircleDot, CheckCircle2 } from 'lucide-react';
import type { BacklogItem, BacklogCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

const PRIORITY_CONFIG = {
  high:     { label: 'High',     className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', dot: 'bg-rose-400', border: 'border-rose-200 dark:border-rose-800' },
  medium:   { label: 'Medium',   className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', dot: 'bg-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  optional: { label: 'Optional', className: 'bg-muted text-muted-foreground', dot: 'bg-muted-foreground/40', border: 'border-border' },
};

const STATUS_ICONS = {
  todo:          Circle,
  'in-progress': CircleDot,
  done:          CheckCircle2,
};

const STATUS_COLOR = {
  todo:          'text-muted-foreground/50',
  'in-progress': 'text-violet-500',
  done:          'text-emerald-500',
};

const CAT_LABEL: Record<BacklogCategory, string> = {
  social:  'Social',
  digital: 'Digital',
  booth:   'Booth',
  print:   'Print',
  content: 'Content',
  system:  'System',
};

const CAT_COLOR: Record<BacklogCategory, string> = {
  social:  'text-blue-600 dark:text-blue-400',
  digital: 'text-violet-600 dark:text-violet-400',
  booth:   'text-emerald-600 dark:text-emerald-400',
  print:   'text-amber-600 dark:text-amber-400',
  content: 'text-orange-600 dark:text-orange-400',
  system:  'text-slate-500 dark:text-slate-400',
};

const CAT_ORDER: BacklogCategory[] = ['social', 'digital', 'booth', 'print', 'content', 'system'];

interface BacklogTabProps {
  items: BacklogItem[];
}

export function BacklogTab({ items }: BacklogTabProps) {
  const byCategory = CAT_ORDER.reduce<Record<string, BacklogItem[]>>((acc, cat) => {
    const catItems = items.filter(i => i.category === cat);
    if (catItems.length) acc[cat] = catItems;
    return acc;
  }, {});

  const high     = items.filter(i => i.priority === 'high'     && i.status !== 'done');
  const medium   = items.filter(i => i.priority === 'medium'   && i.status !== 'done');
  const optional = items.filter(i => i.priority === 'optional' && i.status !== 'done');

  return (
    <div className="space-y-10">
      {/* Priority matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {([
          { label: 'High Priority',   list: high,     cfg: PRIORITY_CONFIG.high },
          { label: 'Medium Priority', list: medium,   cfg: PRIORITY_CONFIG.medium },
          { label: 'Optional',        list: optional, cfg: PRIORITY_CONFIG.optional },
        ] as const).map(({ label, list, cfg }) => (
          <div key={label} className={cn('rounded-2xl border-2 p-4', cfg.border)}>
            <p className="text-base font-semibold mb-3">{label}</p>
            {list.length === 0 ? (
              <p className="text-base text-muted-foreground italic">All done ✓</p>
            ) : (
              <ul className="space-y-2">
                {list.map(item => (
                  <li key={item.id} className="flex items-start gap-2 text-base">
                    <span className={cn('mt-2 w-1.5 h-1.5 rounded-full shrink-0', cfg.dot)} />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Category sections */}
      {Object.entries(byCategory).map(([cat, catItems]) => (
        <div key={cat}>
          <h3 className={cn('text-sm font-semibold uppercase tracking-widest mb-4', CAT_COLOR[cat as BacklogCategory])}>
            {CAT_LABEL[cat as BacklogCategory]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {catItems.map((item, i) => (
              <BacklogCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BacklogCard({ item, index }: { item: BacklogItem; index: number }) {
  const StatusIcon = STATUS_ICONS[item.status];
  const priorityCfg = PRIORITY_CONFIG[item.priority];
  const isDone = item.status === 'done';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={cn(
        'rounded-2xl border border-border bg-card p-5 flex flex-col gap-3',
        isDone && 'opacity-60'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <span className={cn('text-sm font-medium rounded-full px-2.5 py-0.5', priorityCfg.className)}>
          {priorityCfg.label}
        </span>
        <StatusIcon className={cn('size-4 shrink-0', STATUS_COLOR[item.status])} />
      </div>

      {/* Title */}
      <p className={cn('text-base font-semibold leading-snug', isDone && 'line-through text-muted-foreground')}>
        {item.title}
      </p>

      {/* Notes */}
      {item.notes && (
        <p className="text-base text-muted-foreground leading-relaxed">{item.notes}</p>
      )}

      {/* Variants */}
      {item.variants && item.variants.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.variants.map((v, j) => (
            <span key={j} className="text-sm rounded-md bg-muted px-2.5 py-0.5">{v}</span>
          ))}
        </div>
      )}

      {/* Visual Direction */}
      {item.direction && item.direction.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">Direction</p>
          <ul className="space-y-1.5">
            {item.direction.map((d, j) => (
              <li key={j} className="flex items-start gap-2.5 text-base">
                <span className="mt-2 w-1 h-1 rounded-full bg-foreground/25 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Headline */}
      {item.headline && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Headline</p>
          <p className="text-base font-medium leading-snug whitespace-pre-line">{item.headline}</p>
        </div>
      )}

      {/* CTA */}
      {item.cta && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">CTA</p>
          <p className="text-base">{item.cta}</p>
        </div>
      )}

      {/* Still Missing */}
      {item.missing && item.missing.length > 0 && (
        <div className="rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 p-3 mt-1">
          <p className="text-sm font-medium text-rose-700 dark:text-rose-400 mb-2">Still missing</p>
          <ul className="space-y-1.5">
            {item.missing.map((m, j) => (
              <li key={j} className="flex items-start gap-2 text-base text-rose-700 dark:text-rose-300">
                <span className="mt-2 w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
