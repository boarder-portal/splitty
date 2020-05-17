import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ROOM_COST_QUERY } from 'client/graphql/queries';

import { ICost, IRoom, IUser } from 'common/types/room';
import { IAddRoomCostParams } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomCostsProps {
  className?: string;
  rootClassName: string;
  roomId: string;
  costs: ICost[];
  users: IUser[];
}

const Costs: React.FC<IRoomCostsProps> = (props) => {
  const {
    className,
    rootClassName,
    costs,
    roomId,
    users,
  } = props;

  const [fromUserCost, setFromUserCost] = useState<string>('');
  const [toUserCost, setToUserCost] = useState<string>('');
  const [toUsersCost, setToUsersCost] = useState<string[]>([]);
  const [costValue, setCostValue] = useState<string>('');

  const [addRoomCost] = useMutation<{ addRoomCost: IRoom | null }, IAddRoomCostParams>(ADD_ROOM_COST_QUERY);

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
          to: toUsersCost,
        },
      },
    });
  }, [addRoomCost, costValue, fromUserCost, roomId, toUsersCost]);

  useEffect(() => {
    setFromUserCost(users[0].id);
    setToUserCost(users[0].id);
  }, [users]);

  return (
    <div className={`${className} ${rootClassName}`}>
      <div>
        <Heading level="4">Затраты</Heading>

        <div>
          {costs.map((cost) => {
            const fromUserName = getUserNameById(users, cost.from);

            return (
              <div
                key={cost.id}
                className="costItem"
              >
                {`${cost.value} руб. ${fromUserName} -> ${
                  cost.to.map((id) => getUserNameById(users, id)).join(', ')
                }`}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="fromUserTitle">Оплатил</div>

        <select
          className="fromUserSelect"
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

        <div className="toUserTitle">За кого</div>

        <div>
          {toUsersCost.map((toUserCostId) => users.find((user) => user.id === toUserCostId)?.name || '').join(', ')}
        </div>

        <div>
          <select
            className="toUserSelect"
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

          <button
            className="addToCostUserButton"
            onClick={handleAddToCostUserClick}
          >
            Добавить
          </button>
        </div>

        <div className="costValueBlock">
          <div>Сколько</div>

          <input
            className="costInput"
            value={costValue}
            onChange={handleCostChange}
          />
        </div>

        <button
          className="addCostButton"
          onClick={handleAddCostClick}
        >
          Добавить трату
        </button>
      </div>
    </div>
  );
};

export default styled(Costs)`
  .costItem:not(:first-child) {
    margin-top: 4px;
  }

  .fromUserTitle,
  .fromUserSelect,
  .toUserTitle,
  .toUserSelect,
  .costValueBlock,
  .costInput,
  .addCostButton {
    margin-top: 8px;
  }

  .addToCostUserButton {
    margin-left: 12px;
  }
`;
