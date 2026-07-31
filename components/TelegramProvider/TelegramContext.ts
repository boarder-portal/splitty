'use client';

import { createContext } from 'react';

type TelegramContextValue = {
  isReady: boolean;
  isTelegram: boolean;
};

const TelegramContext = createContext<TelegramContextValue | null>(null);

export { TelegramContext };
export type { TelegramContextValue };
