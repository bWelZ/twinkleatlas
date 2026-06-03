'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { guidelines } from '@/lib/playbook-data';
import { companyPlaybookHref } from '@/lib/playbook-routes';

function PlaybookRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const company = searchParams.get('company');
    const target = company && guidelines.some((guideline) => guideline.company === company) ? company : guidelines[0].company;
    router.replace(companyPlaybookHref(target));
  }, [router, searchParams]);

  return null;
}

export default function PlaybookPage() {
  return (
    <Suspense>
      <PlaybookRedirect />
    </Suspense>
  );
}
