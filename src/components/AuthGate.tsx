'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

const LOGIN_PATH = '/login/';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isLoginPage = pathname === '/login' || pathname === LOGIN_PATH;
    if (isLoginPage) {
      setChecked(true);
      return;
    }

    if (!isAuthenticated()) {
      window.location.href = `${LOGIN_PATH}?from=${encodeURIComponent(pathname)}`;
      return;
    }

    setChecked(true);
  }, [pathname]);

  if (!checked) return null;

  return <>{children}</>;
}
