import { IUser } from 'common/types/room';

export default function getUserNameById(users: IUser[], userId: string): string | null {
  const user = users.find((user) => user.id === userId);

  return user?.name || null;
}
