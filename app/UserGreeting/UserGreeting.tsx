'use client';

import UserName from '@/app/UserGreeting/components/UserName/UserName';
import { useTelegram } from '@/components/providers/TelegramProvider/hooks/useTelegram';
import Center from '@/components/ui/Center/Center';
import Stack from '@/components/ui/Stack/Stack';
import Text from '@/components/ui/Text/Text';

function UserGreeting() {
  const { isReady, isTelegram } = useTelegram();

  return (
    <Center component="main" mih="100svh" p="md">
      <Stack maw={448} ta="center" gap="sm">
        {isReady ? isTelegram ? <UserName /> : <Text c="dimmed">Открой приложение в Telegram</Text> : null}
      </Stack>
    </Center>
  );
}

export default UserGreeting;
