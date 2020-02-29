import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ROOM_COST_QUERY } from 'client/graphql/queries';

import { ICost, IRoom, IUser } from 'common/types/room';
import { IAddRoomCost } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';

interface IRoomCostsProps {
  roomId: string;
  costs: ICost[];
  users: IUser[];
}

const RoomCosts: React.FC<IRoomCostsProps> = (props) => {
  const { costs, roomId, users } = props;

  const [fromUserCost, setFromUserCost] = useState<string>('');
  const [toUserCost, setToUserCost] = useState<string>('');
  const [toUsersCost, setToUsersCost] = useState<string[]>([]);
  const [costValue, setCostValue] = useState<string>('');

  const [addRoomCost] = useMutation<{ addRoomCost: IRoom | null }, IAddRoomCost>(ADD_ROOM_COST_QUERY);

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
    addRoomCost({
      variables: {
        roomId,
        cost: {
          value: Number(costValue),
          from: fromUserCost,
          to: toUsersCost
        }
      }
    });
  }, [addRoomCost, costValue, fromUserCost, roomId, toUsersCost]);

  useEffect(() => {
    setFromUserCost(users[0].id);
    setToUserCost(users[0].id);
  }, [users]);

  return (
    <div>
      <div>
        <div>Затраты</div>

        <div>
          {costs.map((cost) => (
            <div key={cost.id}>{`${cost.value} руб. ${getUserNameById(users, cost.from)} -> ${cost.to.map((id) => getUserNameById(users, id)).join(', ')}`}</div>
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

export default RoomCosts;
