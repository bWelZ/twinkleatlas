import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { EventStatus, AssetStatus, AssetType } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatMonth(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function getMonthKey(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + 'T00:00:00');
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// Event status colors
export function eventStatusColor(status: EventStatus): string {
  switch (status) {
    case 'planning':
      return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    case 'in-progress':
      return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
    case 'ready':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
    case 'completed':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    case 'archived':
      return 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export function eventStatusLabel(status: EventStatus): string {
  switch (status) {
    case 'planning': return 'Planning';
    case 'in-progress': return 'In Progress';
    case 'ready': return 'Ready';
    case 'completed': return 'Completed';
    case 'archived': return 'Archived';
    default: return status;
  }
}

// Asset status colors
export function assetStatusColor(status: AssetStatus): string {
  switch (status) {
    case 'pending':
      return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    case 'in-design':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';
    case 'review':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300';
    case 'approved':
      return 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300';
    case 'delivered':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export function assetStatusLabel(status: AssetStatus): string {
  switch (status) {
    case 'pending': return 'Pending';
    case 'in-design': return 'In Design';
    case 'review': return 'Review';
    case 'approved': return 'Approved';
    case 'delivered': return 'Delivered';
    default: return status;
  }
}

// Asset type display label
export function assetTypeLabel(type: AssetType): string {
  switch (type) {
    case 'banner': return 'Banner';
    case 'social': return 'Social';
    case 'postcard': return 'Postcard';
    case 'swag': return 'Swag';
    case 'landing': return 'Landing Page';
    case 'ad': return 'Ad';
    case 'qr': return 'QR Code';
    case 'mockup': return 'Mockup';
    case 'pdf': return 'PDF';
    case 'logo': return 'Logo';
    case 'tablecloth': return 'Tablecloth';
    case 'booth': return 'Booth';
    case 'copy': return 'Copy';
    case 'email': return 'Email';
    case 'workflow': return 'Workflow';
    case 'other': return 'Other';
    default: return type;
  }
}

// Deadline type colors
export function deadlineTypeColor(type: string): string {
  switch (type) {
    case 'design': return 'text-violet-600 dark:text-violet-400';
    case 'print': return 'text-orange-600 dark:text-orange-400';
    case 'shipping': return 'text-blue-600 dark:text-blue-400';
    case 'conference': return 'text-emerald-600 dark:text-emerald-400';
    case 'review': return 'text-amber-600 dark:text-amber-400';
    case 'other': return 'text-slate-600 dark:text-slate-400';
    default: return 'text-slate-600';
  }
}

export function deadlineTypeBg(type: string): string {
  switch (type) {
    case 'design': return 'bg-violet-100 dark:bg-violet-900/40';
    case 'print': return 'bg-orange-100 dark:bg-orange-900/40';
    case 'shipping': return 'bg-blue-100 dark:bg-blue-900/40';
    case 'conference': return 'bg-emerald-100 dark:bg-emerald-900/40';
    case 'review': return 'bg-amber-100 dark:bg-amber-900/40';
    case 'other': return 'bg-slate-100 dark:bg-slate-800';
    default: return 'bg-slate-100';
  }
}

// Company colors
export function companyColor(company: string): string {
  const map: Record<string, string> = {
    'WELS': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    'BWELZ': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    'PreK.Club': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    'Bluejeanware': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    'Partner Hub': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    'ZipData': 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
  };
  return map[company] ?? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300';
}
