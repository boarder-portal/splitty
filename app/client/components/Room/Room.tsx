import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_ROOM_QUERY } from 'client/graphql/queries';

import { IRoom } from 'common/types/room';

import RoomCosts from 'client/components/Room/RoomCosts/RoomCosts';
import RoomUsers from 'client/components/Room/RoomUsers/RoomUsers';
import RoomTransactions from 'client/components/Room/RoomTransactions/RoomTransactions';
import RoomBalance from 'client/components/Room/RoomBalance/RoomBalance';

interface IRouteParams {
  roomId: string;
}

const Room: React.FC = () => {
  const {
    params: {
      roomId
    }
  } = useRouteMatch<IRouteParams>();

  const {
    data: roomData
  } = useQuery<{ room: IRoom | null }, { roomId: string }>(GET_ROOM_QUERY, {
    variables: {
      roomId
    }
  });

  const room = roomData?.room;

  console.log('roomData', roomData);

  if (!room) {
    return <div>Нет такой комнаты</div>;
  }

  const {
    title,
    users,
    costs,
    transactions
  } = room;

  return (
    <div>
      <div>Комната {title}</div>

      <RoomUsers users={users} />

      <RoomCosts
        roomId={room.id}
        users={users}
        costs={costs}
      />

      <RoomTransactions
        roomId={roomId}
        users={users}
        transactions={transactions}
      />

      <RoomBalance
        users={users}
        costs={costs}
        transactions={transactions}
      />
    </div>
  );
};

export default Room;
