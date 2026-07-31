'use client';

import { useContext } from 'react';

import { TelegramContext } from '@/components/providers/TelegramProvider/TelegramContext';

function useTelegram() {
  const value = useContext(TelegramContext);

  if (!value) {
    throw new Error('useTelegram must be used within TelegramProvider');
  }

  return value;
}

export { useTelegram };
