import React from 'react';

import { IUser } from 'common/types/room';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomUsersProps {
  users: IUser[];
}

const Users: React.FC<IRoomUsersProps> = (props) => {
  const { users } = props;

  return (
    <div>
      <Heading level="4">Участники</Heading>

      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Users;
