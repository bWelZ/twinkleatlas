import { events } from './data';
import { companyFromSlug } from './playbook-routes';
import type { Asset, BacklogItem, Event } from './types';

export interface CopyHistoryEntry {
  id: string;
  company: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  sourceTitle: string;
  sourceType: string;
  text: string;
  tags: string[];
}

function isCompanyEvent(event: Event, company: string): boolean {
  if (event.company === company) return true;
  if (company === 'WELS' && event.company === 'WELS / Zipdata') return true;
  return event.company.includes(company);
}

function compactText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

function looksLikeMarketingText(text: string): boolean {
  const t = text.toLowerCase();
  return [
    'headline',
    'cta',
    'copy',
    'caption',
    'social',
    'postcard',
    'booth',
    'signage',
    'talking points',
    'message',
    'thank you',
    'scan',
    'visit us',
    'book a demo',
    'proud',
    'connect',
  ].some((needle) => t.includes(needle));
}

function entryFromText(
  event: Event,
  company: string,
  sourceTitle: string,
  sourceType: string,
  text: string,
  tags: string[] = []
): CopyHistoryEntry | null {
  const clean = compactText(text);
  if (!clean || clean.length < 24) return null;
  if (!looksLikeMarketingText(`${sourceTitle}\n${clean}\n${tags.join(' ')}`)) return null;

  return {
    id: `${event.id}-${sourceType}-${sourceTitle}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    company,
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    sourceTitle,
    sourceType,
    text: clean,
    tags,
  };
}

function entriesFromBacklog(event: Event, company: string, item: BacklogItem): CopyHistoryEntry[] {
  const entries: CopyHistoryEntry[] = [];
  if (item.headline) {
    const entry = entryFromText(event, company, item.title, 'backlog headline', item.headline, [item.category, item.status]);
    if (entry) entries.push(entry);
  }
  if (item.cta) {
    const entry = entryFromText(event, company, item.title, 'backlog cta', item.cta, [item.category, item.status]);
    if (entry) entries.push(entry);
  }
  if (item.notes) {
    const entry = entryFromText(event, company, item.title, 'backlog notes', item.notes, [item.category, item.status]);
    if (entry) entries.push(entry);
  }
  if (item.direction?.length) {
    const entry = entryFromText(event, company, item.title, 'backlog direction', item.direction.join('\n'), [item.category, item.status]);
    if (entry) entries.push(entry);
  }
  if (item.variants?.length) {
    const entry = entryFromText(event, company, item.title, 'backlog variants', item.variants.join('\n'), [item.category, item.status]);
    if (entry) entries.push(entry);
  }
  return entries;
}

function entriesFromAsset(event: Event, company: string, asset: Asset): CopyHistoryEntry[] {
  const entries: CopyHistoryEntry[] = [];
  if (asset.notes) {
    const entry = entryFromText(event, company, asset.title, `${asset.type} notes`, asset.notes, asset.tags);
    if (entry) entries.push(entry);
  }
  return entries;
}

export function getCopyHistoryForCompany(company: string): CopyHistoryEntry[] {
  const entries = events
    .filter((event) => isCompanyEvent(event, company))
    .flatMap((event) => [
      ...((event.backlog ?? []).flatMap((item) => entriesFromBacklog(event, company, item))),
      ...event.assets.flatMap((asset) => entriesFromAsset(event, company, asset)),
    ]);

  const seen = new Set<string>();
  return entries
    .filter((entry) => {
      const key = `${entry.eventId}:${entry.sourceTitle}:${entry.text}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => b.eventDate.localeCompare(a.eventDate));
}

export function getCopyHistoryForSlug(slug: string): CopyHistoryEntry[] {
  const company = companyFromSlug(slug);
  return company ? getCopyHistoryForCompany(company) : [];
}
