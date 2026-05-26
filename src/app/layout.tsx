import type { Metadata } from 'next';
import { Nunito, Nunito_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { TwinkleStyles } from '@/components/TwinkleStyles';

// Twinkle DS heading + UI font (variable weight 200–1000)
const nunitoFont = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  display: 'swap',
});

// Twinkle DS body text font (variable weight 200–1000)
const nunitoSansFont = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  display: 'swap',
});

// Kept for code blocks and monospace contexts
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Twinkle Atlas',
  description: 'Visual event & creative asset management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoFont.variable} ${nunitoSansFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TwinkleStyles />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
