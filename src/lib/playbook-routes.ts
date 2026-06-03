import { guidelines } from './playbook-data';

export const companySlugs: Record<string, string> = {
  'PreK.Club': 'prek-club',
  WELS: 'wels',
  ZipData: 'zipdata',
  BWELZ: 'bwelz',
};

export function companySlug(company: string): string {
  return companySlugs[company] ?? company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function companyFromSlug(slug: string): string | undefined {
  return guidelines.find((guideline) => companySlug(guideline.company) === slug)?.company;
}

export function companyPlaybookHref(company: string): string {
  return `/playbook/${companySlug(company)}`;
}

export function companyCopyHistoryHref(company: string): string {
  return `${companyPlaybookHref(company)}/copy-history`;
}
