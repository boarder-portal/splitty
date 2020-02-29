import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_ROOM_TRANSACTION_QUERY } from 'client/graphql/queries';

import { IRoom, ITransaction, IUser } from 'common/types/room';
import { IAddRoomTransaction } from 'common/types/requestParams';

interface IRoomTransactionsProps {
  roomId: string;
  transactions: ITransaction[];
  users: IUser[];
}

const RoomTransactions: React.FC<IRoomTransactionsProps> = (props) => {
  const { transactions, roomId, users } = props;

  const [fromUser, setFromUser] = useState<string>('');
  const [toUser, setToUser] = useState<string>('');
  const [transactionValue, setTransactionValue] = useState<string>('');

  const [addRoomTransaction] = useMutation<{ addRoomTransaction: IRoom | null }, IAddRoomTransaction>(ADD_ROOM_TRANSACTION_QUERY);

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
    addRoomTransaction({
      variables: {
        roomId,
        transaction: {
          value: Number(transactionValue),
          from: fromUser,
          to: toUser
        }
      }
    });
  }, [addRoomTransaction, fromUser, roomId, toUser, transactionValue]);

  useEffect(() => {
    setFromUser(users[0].id);
    setToUser(users[0].id);
  }, [users]);

  return (
    <div>
      <div>
        <div>Переводы</div>

        <div>
          {transactions.map((transaction) => (
            <div key={transaction.id}>{`${transaction.value} руб. ${transaction.from} -> ${transaction.to}`}</div>
          ))}
        </div>
      </div>

      <div>
        <div>Перевел</div>

        <select
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

        <div>Кому</div>

        <select
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

        <div>
          <div>Сколько</div>

          <input
            value={transactionValue}
            onChange={handleTransactionValueChange}
          />
        </div>

        <div>
          <button onClick={handleAddTransactionClick}>Добавить перевод</button>
        </div>
      </div>
    </div>
  );
};

export default RoomTransactions;
