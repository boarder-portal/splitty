'use client';

import UserName from '@/app/UserGreeting/components/UserName/UserName';
import { useTelegram } from '@/components/TelegramProvider/hooks/useTelegram';

function UserGreeting() {
  const { isReady, isTelegram } = useTelegram();

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="max-w-md text-center text-base leading-relaxed">
        {isReady ? (
          isTelegram ? (
            <UserName />
          ) : (
            <p className="text-muted-foreground">Открой приложение в Telegram</p>
          )
        ) : null}
      </div>
    </main>
  );
}

export default UserGreeting;
