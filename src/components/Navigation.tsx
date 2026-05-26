'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Search } from 'lucide-react';
import { TwinkleIcon, type TwinkleIconName } from '@/components/ui/TwinkleIcon';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onOpenCommandPalette?: () => void;
}

const navLinks: { href: string; label: string; icon: TwinkleIconName }[] = [
  { href: '/', label: 'Dashboard', icon: 'display-board' },
  { href: '/gallery', label: 'Gallery', icon: 'image' },
  { href: '/timeline', label: 'Timeline', icon: 'calendar' },
];

export function Navigation({ onOpenCommandPalette }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-200',
        scrolled
          ? 'border-border bg-background/90 backdrop-blur-md'
          : 'border-transparent bg-background/60 backdrop-blur-sm'
      )}
    >
      <div className="flex h-14 w-full items-center gap-4 px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 shadow-sm"
          >
            <Sparkles className="size-4 text-white" />
          </motion.div>
          <span className="font-semibold text-sm tracking-tight hidden sm:block">
            Twinkle Atlas
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 ml-2">
          {navLinks.map(({ href, label, icon }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <TwinkleIcon name={icon} size="14px" />
                  <span className="hidden sm:block">{label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Command palette trigger */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Search className="size-3.5" />
          <span>Search...</span>
          <kbd className="ml-2 flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenCommandPalette}
          className="flex sm:hidden items-center justify-center rounded-lg w-8 h-8 hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Search"
        >
          <Search className="size-4" />
        </motion.button>

        {/* Dark mode toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="flex items-center justify-center rounded-lg w-8 h-8 hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.button>
      </div>
    </motion.header>
  );
}
