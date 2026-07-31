import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

import MantineProvider from '@/components/providers/MantineProvider/MantineProvider';
import TelegramProvider from '@/components/providers/TelegramProvider/TelegramProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider>
          <TelegramProvider>{children}</TelegramProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
