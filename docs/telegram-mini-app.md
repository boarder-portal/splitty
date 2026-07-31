# Telegram Mini App

Текущее устройство клиентского каркаса Splitty.

## Что есть сейчас

- Приложение рассчитано на запуск как Telegram Mini App (`/`).
- SDK: `@tma.js/sdk-react` (`init`, `miniApp.ready`, launch params).
- Имя пользователя берётся на клиенте из launch params (`first_name`), без серверной проверки `initData`.
- Bootstrap: [`components/providers/TelegramProvider/TelegramProvider.tsx`](../components/providers/TelegramProvider/TelegramProvider.tsx) — в development вне Telegram подключается `mockTelegramEnv` (если нет postEvent-bridge: iframe/`TelegramWebviewProxy`), затем `init()`, `themeParams.mount()` и `miniApp.ready`. `isTMA()` сам по себе недостаточен: launch params могут остаться в storage без bridge и привести к `UnknownEnvError`. Без `themeParams.mount()` `isDark` по умолчанию `true`.
- UI: [`app/UserGreeting/UserGreeting.tsx`](../app/UserGreeting/UserGreeting.tsx) — «Привет, {first_name}»; в production вне Telegram — заглушка «Открой приложение в Telegram»; до готовности SDK — нейтральный пустой кадр.

## UI-стек (Mantine)

- Провайдеры в [`app/layout.tsx`](../app/layout.tsx): `MantineProvider` → `TelegramProvider`.
- Тема: [`lib/theme.ts`](../lib/theme.ts) — пастельный `primary`, `defaultRadius: 'sm'`, системный шрифт, дефолты контролов в `theme.components`.
- Синхронизация схемы: [`components/providers/TelegramProvider/components/TelegramColorSchemeSync/TelegramColorSchemeSync.tsx`](../components/providers/TelegramProvider/components/TelegramColorSchemeSync/TelegramColorSchemeSync.tsx) — в TMA `themeParams.isDark` → Mantine `light`/`dark`; вне Telegram всегда `light`.
- Обёртки Mantine-компонентов: `components/ui/<Name>/<Name>.tsx` — тонкий re-export; фичи импортируют только `@/components/ui/...`.
- Провайдеры: `components/providers/...`.
- Иконки: `@tabler/icons-react`.

## Границы этого этапа

Пока не делаем (не запрет на будущее — обновить этот файл, когда появится):

- серверная валидация `initData`, bot token, API routes;
- `viewport.expand` и sync цветов Telegram в палитру Mantine (только `light`/`dark`);
- домен расходов и балансов.
