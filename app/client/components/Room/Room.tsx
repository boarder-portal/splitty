import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { GET_ROOM_QUERY } from 'client/graphql/queries';

import { IRoom } from 'common/types/room';

import Costs from 'client/components/Room/components/Costs/Costs';
import Users from 'client/components/Room/components/Users/Users';
import Transactions from 'client/components/Room/components/Transactions/Transactions';
import Balance from 'client/components/Room/components/Balance/Balance';
import Heading from 'client/components/common/Heading/Heading';

interface IRouteParams {
  roomId: string;
}

interface IRoomProps {
  className?: string;
}

const Room: React.FC<IRoomProps> = (props) => {
  const { className } = props;

  const {
    params: {
      roomId,
    },
  } = useRouteMatch<IRouteParams>();

  const {
    data: roomData,
  } = useQuery<{ room: IRoom | null }, { roomId: string }>(GET_ROOM_QUERY, {
    variables: {
      roomId,
    },
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
    transactions,
  } = room;

  return (
    <div className={className}>
      <Heading level="1">{title}</Heading>

      <Users users={users} />

      <Costs
        rootClassName="costs"
        roomId={room.id}
        users={users}
        costs={costs}
      />

      <Transactions
        rootClassName="transactions"
        roomId={roomId}
        users={users}
        transactions={transactions}
      />

      <Balance
        rootClassName="balance"
        users={users}
        costs={costs}
        transactions={transactions}
      />
    </div>
  );
};

export default styled(Room)`
  padding: 0 32px;

  .costs,
  .transactions,
  .balance {
    margin-top: 12px;
  }
`;
