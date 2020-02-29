import React from 'react';

import { IUser } from 'common/types/room';

interface IRoomUsersProps {
  users: IUser[];
}

const RoomUsers: React.FC<IRoomUsersProps> = (props) => {
  const { users } = props;

  return (
    <div>
      <div>Участники</div>

      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};

export default RoomUsers;
