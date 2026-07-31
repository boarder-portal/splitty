'use client';

import { emitEvent, init, isTMA, miniApp, mockTelegramEnv, themeParams, UnknownEnvError } from '@tma.js/sdk-react';
import { useEffect, useState, type ReactNode } from 'react';

import TelegramColorSchemeSync from '@/components/providers/TelegramProvider/components/TelegramColorSchemeSync/TelegramColorSchemeSync';
import { TelegramContext } from '@/components/providers/TelegramProvider/TelegramContext';

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
  const mockThemeParams = {
    accent_text_color: '#2481cc',
    bg_color: '#ffffff',
    button_color: '#2481cc',
    button_text_color: '#ffffff',
    destructive_text_color: '#cc2929',
    header_bg_color: '#ffffff',
    hint_color: '#999999',
    link_color: '#2481cc',
    secondary_bg_color: '#f1f1f1',
    section_bg_color: '#ffffff',
    section_header_text_color: '#2481cc',
    subtitle_text_color: '#999999',
    text_color: '#000000',
  } as const;

  mockTelegramEnv({
    launchParams: {
      tgWebAppThemeParams: mockThemeParams,
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
          theme_params: mockThemeParams,
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
      themeParams.mount();
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

  return (
    <TelegramContext.Provider value={{ isReady, isTelegram }}>
      <TelegramColorSchemeSync />
      {children}
    </TelegramContext.Provider>
  );
}

export default TelegramProvider;
