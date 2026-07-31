'use client';

import { useLaunchParams } from '@tma.js/sdk-react';

function UserName() {
  const launchParams = useLaunchParams();
  const firstName = launchParams.tgWebAppData?.user?.first_name;

  if (!firstName) {
    return null;
  }

  return <h1 className="text-2xl font-medium tracking-tight">Привет, {firstName}</h1>;
}

export default UserName;
