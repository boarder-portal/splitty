'use client';

import { useMantineColorScheme } from '@mantine/core';
import { themeParams, useSignal } from '@tma.js/sdk-react';
import { useEffect } from 'react';

import { useTelegram } from '@/components/providers/TelegramProvider/hooks/useTelegram';

function TelegramColorSchemeSync() {
  const { isReady, isTelegram } = useTelegram();
  const { setColorScheme } = useMantineColorScheme();
  const isDark = useSignal(themeParams.isDark);
  const isThemeMounted = useSignal(themeParams.isMounted);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isTelegram) {
      setColorScheme('light');

      return;
    }

    // Without mount, themeParams.bgColor is undefined and isDark defaults to true.
    if (!isThemeMounted) {
      return;
    }

    setColorScheme(isDark ? 'dark' : 'light');
  }, [isDark, isReady, isTelegram, isThemeMounted, setColorScheme]);

  return null;
}

export default TelegramColorSchemeSync;
