# Telegram Mini App

Текущее устройство клиентского каркаса Splitty.

## Что есть сейчас

- Приложение рассчитано на запуск как Telegram Mini App (`/`).
- SDK: `@tma.js/sdk-react` (`init`, `miniApp.ready`, launch params).
- Имя пользователя берётся на клиенте из launch params (`first_name`), без серверной проверки `initData`.
- Bootstrap: [`components/TelegramProvider/TelegramProvider.tsx`](../components/TelegramProvider/TelegramProvider.tsx) — в development вне Telegram подключается `mockTelegramEnv` (если нет postEvent-bridge: iframe/`TelegramWebviewProxy`), затем `init()` и `miniApp.ready`. `isTMA()` сам по себе недостаточен: launch params могут остаться в storage без bridge и привести к `UnknownEnvError`.
- UI: [`app/UserGreeting/UserGreeting.tsx`](../app/UserGreeting/UserGreeting.tsx) — «Привет, {first_name}»; в production вне Telegram — заглушка «Открой приложение в Telegram»; до готовности SDK — нейтральный пустой кадр.

## Границы этого этапа

Пока не делаем (не запрет на будущее — обновить этот файл, когда появится):

- серверная валидация `initData`, bot token, API routes;
- `viewport.expand` и sync темы Telegram в CSS;
- домен расходов и балансов.
