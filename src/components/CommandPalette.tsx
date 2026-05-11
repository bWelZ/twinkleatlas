'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { CalendarDays, Images, LayoutDashboard, Moon, Sun, Sparkles } from 'lucide-react';
import { events } from '@/lib/data';
import { useTheme } from '@/components/ThemeProvider';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const navigate = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Command Palette" description="Search events, navigate pages, toggle settings">
      <Command className="rounded-xl!">
        <CommandInput placeholder="Search events, pages, or commands..." />
        <CommandList>
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-4">
              <Sparkles className="size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No results found</p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Navigate">
            <CommandItem onSelect={() => navigate('/')}>
              <LayoutDashboard className="size-4" />
              <span>Dashboard</span>
              <CommandShortcut>Home</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => navigate('/gallery')}>
              <Images className="size-4" />
              <span>Gallery</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate('/timeline')}>
              <CalendarDays className="size-4" />
              <span>Timeline</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => {
                toggleTheme();
                onOpenChange(false);
              }}
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
              <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Events">
            {events.map((event) => (
              <CommandItem
                key={event.id}
                value={`${event.title} ${event.company} ${event.location}`}
                onSelect={() => navigate(`/events/${event.id}`)}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-gradient-to-br ${event.coverGradient} shrink-0`}
                />
                <span className="flex-1 truncate">{event.title}</span>
                <span className="text-xs text-muted-foreground shrink-0 ml-2">{event.company}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
