'use client';

import { emitEvent, init, isTMA, miniApp, mockTelegramEnv, UnknownEnvError } from '@tma.js/sdk-react';
import { useEffect, useState, type ReactNode } from 'react';

import { TelegramContext } from '@/components/TelegramProvider/TelegramContext';

let didStartSdk = false;

function hasPostEventBridge() {
  try {
    if (window.self !== window.top) {
      return true;
    }
  } catch {
    return true;
  }

  const proxy = (
    window as Window & {
      TelegramWebviewProxy?: { postEvent?: unknown };
    }
  ).TelegramWebviewProxy;

  return typeof proxy?.postEvent === 'function';
}

function mockDevTelegramEnv() {
  const themeParams = {
    accent_text_color: '#6ab2f2',
    bg_color: '#17212b',
    button_color: '#5288c1',
    button_text_color: '#ffffff',
    destructive_text_color: '#ec3942',
    header_bg_color: '#17212b',
    hint_color: '#708499',
    link_color: '#6ab3f3',
    secondary_bg_color: '#232e3c',
    section_bg_color: '#17212b',
    section_header_text_color: '#6ab3f3',
    subtitle_text_color: '#708499',
    text_color: '#f5f5f5',
  } as const;

  mockTelegramEnv({
    launchParams: {
      tgWebAppThemeParams: themeParams,
      tgWebAppData: new URLSearchParams([
        [
          'user',
          JSON.stringify({
            id: 1,
            first_name: 'Павел',
          }),
        ],
        ['hash', ''],
        ['signature', ''],
        ['auth_date', Date.now().toString()],
      ]),
      tgWebAppStartParam: 'debug',
      tgWebAppVersion: '8',
      tgWebAppPlatform: 'tdesktop',
    },
    onEvent(event) {
      if (event.name === 'web_app_request_theme') {
        return emitEvent('theme_changed', {
          theme_params: themeParams,
        });
      }

      if (event.name === 'web_app_request_viewport') {
        return emitEvent('viewport_changed', {
          height: window.innerHeight,
          width: window.innerWidth,
          is_expanded: true,
          is_state_stable: true,
        });
      }
    },
    resetPostMessage: true,
  });
}

function prepareTelegramEnv() {
  // isTMA() can be true from cached launch params alone, without a postEvent
  // bridge — that path makes init() throw UnknownEnvError.
  if (hasPostEventBridge()) {
    return isTMA();
  }

  if (process.env.NODE_ENV === 'development') {
    mockDevTelegramEnv();

    return hasPostEventBridge() && isTMA();
  }

  return false;
}

function TelegramProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);

  useEffect(() => {
    if (didStartSdk) {
      setIsTelegram(isTMA() && hasPostEventBridge());
      setIsReady(true);

      return;
    }

    didStartSdk = true;

    const inTelegram = prepareTelegramEnv();

    if (!inTelegram) {
      setIsTelegram(false);
      setIsReady(true);

      return;
    }

    try {
      init();
      miniApp.ready.ifAvailable();
      setIsTelegram(true);
    } catch (error) {
      if (!UnknownEnvError.is(error)) {
        throw error;
      }

      setIsTelegram(false);
    }

    setIsReady(true);
  }, []);

  return <TelegramContext.Provider value={{ isReady, isTelegram }}>{children}</TelegramContext.Provider>;
}

export default TelegramProvider;
