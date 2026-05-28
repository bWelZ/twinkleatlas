'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Sun, Search, BookOpen, LayoutTemplate, Users, ChevronDown } from 'lucide-react';
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

const guidelineCompanies = ['PreK.Club', 'WELS', 'BWELZ'];

function PlaybookDropdown({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-base font-medium transition-colors',
          isActive
            ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <TwinkleIcon name="reading" size="14px" />
        <span className="hidden sm:block">Playbook</span>
        <ChevronDown className={cn('hidden sm:block size-3 transition-transform duration-150', open && 'rotate-180')} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-1.5 w-52 rounded-xl border border-border bg-popover shadow-lg overflow-hidden z-50"
          >
            {/* Guidelines section */}
            <div className="px-3 pt-2.5 pb-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="size-3" />
                Guidelines
              </p>
            </div>
            {guidelineCompanies.map((company) => (
              <Link
                key={company}
                href={`/playbook?company=${encodeURIComponent(company)}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors"
              >
                <span className="text-sm text-foreground">{company}</span>
              </Link>
            ))}

            {/* Separator */}
            <div className="my-1 border-t border-border" />

            {/* Other sections */}
            <Link
              href="/playbook/templates"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors"
            >
              <LayoutTemplate className="size-3.5 text-muted-foreground" />
              <span className="text-sm text-foreground">Templates</span>
            </Link>
            <Link
              href="/playbook/vendors"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors"
            >
              <Users className="size-3.5 text-muted-foreground" />
              <span className="text-sm text-foreground">Vendors & Contacts</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          <span className="font-semibold text-base tracking-tight hidden sm:block">
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
                    'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-base font-medium transition-colors',
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
          <PlaybookDropdown isActive={pathname.startsWith('/playbook')} />
        </nav>

        <div className="flex-1" />

        {/* Command palette trigger */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-base text-muted-foreground hover:bg-muted transition-colors"
        >
          <Search className="size-3.5" />
          <span>Search...</span>
          <kbd className="ml-2 flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-base font-mono text-muted-foreground">
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
