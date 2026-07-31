import { Geist_Mono, Inter } from 'next/font/google';

import './globals.css';
import TelegramProvider from '@/components/TelegramProvider/TelegramProvider';
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn('antialiased', fontMono.variable, 'font-sans', inter.variable)}
    >
      <body>
        <ThemeProvider>
          <TelegramProvider>{children}</TelegramProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
