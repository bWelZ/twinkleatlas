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

// Company hex colors — keyed to Twinkle DS palettes
const COMPANY_HEX: Record<string, string> = {
  'WELS':           '#971adb',  // Violet palette
  'PreK.Club':      '#1dc386',  // Mint palette
  'WELS / Zipdata': '#4fcab2',  // Turquoise palette
  'Zipdata':        '#1d90c2',  // Celestial Blue palette
  'PartnerHub':     '#e11474',  // Pink palette
  'Bluejeanware':   '#1f35ff',  // Blue palette
  'BWELZ':          '#c5761b',  // Ochre palette
};

export function companyHex(company: string): string {
  return COMPANY_HEX[company] ?? '#64748b';
}

const COMPANY_RAINBOW: Record<string, string> = {
  'PreK.Club':      'var(--caribbean-green-regular, #40eab7)',
  'WELS':           'var(--pink-flamingo-regular, #e46af3)',
  'WELS / Zipdata': 'var(--turquoise-blue-regular, #28dcf7)',
  'Zipdata':        'var(--picton-blue-regular, #2cc5ff)',
  'PartnerHub':     'var(--brilliant-rose-regular, #fc7ac0)',
  'Bluejeanware':   'var(--cornflower-blue-regular, #89a2fd)',
  'BWELZ':          'var(--sea-buckthorn-regular, #ffab35)',
};

export function companyRainbow(company: string): string {
  return COMPANY_RAINBOW[company] ?? 'var(--persimmon-regular, #ff6e5d)';
}

type CompanyRainbowPalette = {
  light: string;
  regular: string;
  dark: string;
};

const COMPANY_RAINBOW_PALETTE: Record<string, CompanyRainbowPalette> = {
  'PreK.Club': {
    light: 'var(--caribbean-green-light, #b6f9de)',
    regular: 'var(--caribbean-green-regular, #40eab7)',
    dark: 'var(--caribbean-green-dark, #04291d)',
  },
  'WELS': {
    light: 'var(--pink-flamingo-light, #f5d0f9)',
    regular: 'var(--pink-flamingo-regular, #e46af3)',
    dark: 'var(--pink-flamingo-dark, #301333)',
  },
  'WELS / Zipdata': {
    light: 'var(--turquoise-blue-light, #bff2fc)',
    regular: 'var(--turquoise-blue-regular, #28dcf7)',
    dark: 'var(--turquoise-blue-dark, #0b272c)',
  },
  'Zipdata': {
    light: 'var(--picton-blue-light, #c6ebfe)',
    regular: 'var(--picton-blue-regular, #2cc5ff)',
    dark: 'var(--picton-blue-dark, #07232f)',
  },
  'PartnerHub': {
    light: 'var(--brilliant-rose-light, #ffd3e7)',
    regular: 'var(--brilliant-rose-regular, #fc7ac0)',
    dark: 'var(--brilliant-rose-dark, #3a0826)',
  },
  'Bluejeanware': {
    light: 'var(--cornflower-blue-light, #d6e0ff)',
    regular: 'var(--cornflower-blue-regular, #89a2fd)',
    dark: 'var(--cornflower-blue-dark, #171d32)',
  },
  'BWELZ': {
    light: 'var(--sea-buckthorn-light, #fbe4ca)',
    regular: 'var(--sea-buckthorn-regular, #ffab35)',
    dark: 'var(--sea-buckthorn-dark, #2c1b05)',
  },
};

const DEFAULT_COMPANY_RAINBOW_PALETTE: CompanyRainbowPalette = {
  light: 'var(--persimmon-light, #ffdfda)',
  regular: 'var(--persimmon-regular, #ff6e5d)',
  dark: 'var(--persimmon-dark, #3b0604)',
};

export function companyRainbowPalette(company: string): CompanyRainbowPalette {
  return COMPANY_RAINBOW_PALETTE[company] ?? DEFAULT_COMPANY_RAINBOW_PALETTE;
}

// Keep for backward compat — callers should pair with style={{ backgroundColor: companyHex() }}
export function companyColor(_company: string): string {
  return 'text-white';
}
