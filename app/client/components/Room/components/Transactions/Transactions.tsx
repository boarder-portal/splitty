import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ROOM_TRANSACTION_QUERY } from 'client/graphql/queries';

import { IRoom, ITransaction, IUser } from 'common/types/room';
import { IAddRoomTransactionParams } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomTransactionsProps {
  className?: string;
  rootClassName: string;
  roomId: string;
  transactions: ITransaction[];
  users: IUser[];
}

const Transactions: React.FC<IRoomTransactionsProps> = (props) => {
  const {
    className,
    rootClassName,
    transactions,
    roomId,
    users,
  } = props;

  const [fromUser, setFromUser] = useState<string>('');
  const [toUser, setToUser] = useState<string>('');
  const [transactionValue, setTransactionValue] = useState<string>('');

  const [addRoomTransaction] = useMutation<{ addRoomTransaction: IRoom | null }, IAddRoomTransactionParams>(ADD_ROOM_TRANSACTION_QUERY);

  const handleFromUserChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromUser(e.target.value);
  }, []);

  const handleToUserChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setToUser(e.target.value);
  }, []);

  const handleTransactionValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedInt = parseInt(e.target.value, 10);

    setTransactionValue(parsedInt ? String(parsedInt) : '');
  }, []);

  const handleAddTransactionClick = useCallback(() => {
    setTransactionValue('');

    addRoomTransaction({
      variables: {
        roomId,
        transaction: {
          value: Number(transactionValue),
          from: fromUser,
          to: toUser,
        },
      },
    });
  }, [addRoomTransaction, fromUser, roomId, toUser, transactionValue]);

  useEffect(() => {
    setFromUser(users[0].id);
    setToUser(users[1].id);
  }, [users]);

  return (
    <div className={`${className} ${rootClassName}`}>
      <div>
        <Heading level="4">Переводы</Heading>

        <div>
          {transactions.map((transaction) => {
            const userNameFrom = getUserNameById(users, transaction.from);
            const userNameTo = getUserNameById(users, transaction.to);

            return (
              <div
                key={transaction.id}
                className="transactionItem"
              >
                {`${transaction.value} руб. ${userNameFrom} -> ${userNameTo}`}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="fromUserTitle">Перевел</div>

        <select
          className="fromUserSelect"
          value={fromUser}
          onChange={handleFromUserChange}
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

        <div className="toUserTitle">Кому</div>

        <select
          className="toUserSelect"
          value={toUser}
          onChange={handleToUserChange}
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

        <div className="transactionValueBlock">
          <div>Сколько</div>

          <input
            className="transactionValueInput"
            value={transactionValue}
            onChange={handleTransactionValueChange}
          />
        </div>

        <button
          className="addTransactionButton"
          onClick={handleAddTransactionClick}
        >
          Добавить перевод
        </button>
      </div>
    </div>
  );
};

export default styled(Transactions)`
  .transactionItem:not(:first-child) {
    margin-top: 4px;
  }

  .fromUserTitle,
  .fromUserSelect,
  .toUserTitle,
  .toUserSelect,
  .transactionValueBlock,
  .transactionValueInput,
  .addTransactionButton {
    margin-top: 8px;
  }
`;
