'use client';

import { MantineProvider as MantineProviderBase } from '@mantine/core';
import { type ReactNode } from 'react';

import { theme } from '@/lib/theme';

function MantineProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProviderBase theme={theme} defaultColorScheme="light">
      {children}
    </MantineProviderBase>
  );
}

export default MantineProvider;
