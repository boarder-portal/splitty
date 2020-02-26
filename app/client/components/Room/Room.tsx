import React, { useState, useCallback, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { ADD_ROOM_COST_QUERY, GET_ROOM_QUERY } from 'client/graphql/queries';

import { IRoom } from 'common/types/room';
import { IAddRoomCost, ICreateRoomParams } from 'server/graphql/resolvers';

interface IRouteParams {
  roomId: string;
}

const Room: React.FC = () => {
  const {
    params: {
      roomId
    }
  } = useRouteMatch<IRouteParams>();

  const [fromUserCost, setFromUserCost] = useState<string>('');
  const [toUserCost, setToUserCost] = useState<string>('');
  const [toUsersCost, setToUsersCost] = useState<string[]>([]);
  const [costValue, setCostValue] = useState<string>('');

  const {
    data: roomData,
    loading: roomIsLoading
  } = useQuery<{ room: IRoom | null }, { roomId: string }>(GET_ROOM_QUERY, {
    variables: {
      roomId
    }
  });

  const [addRoomCost] = useMutation<{ addRoomCost: IRoom | null }, IAddRoomCost>(ADD_ROOM_COST_QUERY);

  const room = roomData?.room;

  const handleFromCostUserChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUserCost(e.target.value);
  }, []);

  const handleToCostUserChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUserCost(e.target.value);
  }, []);

  const handleAddToCostUserClick = useCallback(() => {
    setToUsersCost([...toUsersCost, toUserCost]);
  }, [toUserCost, toUsersCost]);

  const handleCostChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedInt = parseInt(e.target.value, 10);

    setCostValue(parsedInt ? String(parsedInt) : '');
  }, []);

  const handleAddCostClick = useCallback(() => {
    if (!room) {
      return;
    }

    addRoomCost({
      variables: {
        roomId: room.id,
        cost: {
          value: Number(costValue),
          from: fromUserCost,
          to: toUsersCost
        }
      }
    });
  }, [addRoomCost, costValue, fromUserCost, room, toUsersCost]);

  console.log('roomData', roomData);
  console.log('roomIsLoading', roomIsLoading);
  console.log('fromUserCost', fromUserCost);
  console.log('toUserCost', toUserCost);
  console.log('toUsersCost', toUsersCost);

  useEffect(() => {
    if (!room) {
      return;
    }

    setFromUserCost(room.users[0].id);
    setToUserCost(room.users[0].id);
  }, [room]);

  if (!room) {
    return <div>Нет такой комнаты</div>;
  }

  const {
    title,
    users,
    costs
  } = room;

  return (
    <div>
      <div>Комната {title}</div>

      <div>
        <div>Участники</div>

        <div>
          {users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      </div>

      <div>
        <div>Затраты</div>

        <div>
          {costs.map((cost) => (
            <div key={cost.id}>{`${cost.value} руб. ${cost.from} -> ${cost.to}`}</div>
          ))}
        </div>
      </div>

      <div>
        <div>Оплатил</div>

        <select
          value={fromUserCost}
          onChange={handleFromCostUserChange}
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <div>За кого</div>

        <div>
          {toUsersCost.map((toUserCostId) => users.find((user) => user.id === toUserCostId)?.name || '').join(', ')}
        </div>

        <select
          value={toUserCost}
          onChange={handleToCostUserChange}
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <div>
          <button onClick={handleAddToCostUserClick}>Добавить</button>
        </div>

        <div>
          <div>Сколько</div>

          <input
            value={costValue}
            onChange={handleCostChange}
          />
        </div>

        <div>
          <button onClick={handleAddCostClick}>Добавить трату</button>
        </div>
      </div>
    </div>
  );
};

export default Room;
