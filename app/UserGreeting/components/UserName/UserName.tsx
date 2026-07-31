'use client';

import { useLaunchParams } from '@tma.js/sdk-react';

import Title from '@/components/ui/Title/Title';

function UserName() {
  const launchParams = useLaunchParams();
  const firstName = launchParams.tgWebAppData?.user?.first_name;

  if (!firstName) {
    return null;
  }

  return (
    <Title order={2} fw={500}>
      Привет, {firstName}
    </Title>
  );
}

export default UserName;
