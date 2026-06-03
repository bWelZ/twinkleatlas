import { notFound } from 'next/navigation';
import { CopyHistoryPageClient } from '@/components/playbook/CopyHistoryPageClient';
import { guidelines } from '@/lib/playbook-data';
import { companyFromSlug, companySlug } from '@/lib/playbook-routes';

export function generateStaticParams() {
  return guidelines.map((guideline) => ({ company: companySlug(guideline.company) }));
}

export default async function CopyHistoryPage({ params }: { params: Promise<{ company: string }> }) {
  const { company: slug } = await params;
  const company = companyFromSlug(slug);
  if (!company) notFound();
  return <CopyHistoryPageClient company={company} />;
}
