import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';

import { DELETE_ROOM_TRANSACTION_QUERY } from 'client/graphql/queries';

import { IRoom, ITransaction, IUser } from 'common/types/room';
import { IDeleteRoomTransactionParams } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomTransactionsProps {
  className?: string;
  rootClassName: string;
  transactions: ITransaction[];
  users: IUser[];
}

const Root = styled.div`
  .transactionItem {
    display: flex;
    align-items: center;
    line-height: 1.33;

    &:not(:first-child) {
      margin-top: 4px;
    }
  }

  .deleteIcon {
    margin-left: auto;
    padding-left: 4px;
  }
`;

const Transactions: React.FC<IRoomTransactionsProps> = (props) => {
  const {
    className,
    rootClassName,
    transactions,
    users,
  } = props;

  const { roomId } = useParams<{ roomId: string }>();

  const [deleteRoomTransaction] = useMutation<{ deleteRoomTransaction: IRoom }, IDeleteRoomTransactionParams>(DELETE_ROOM_TRANSACTION_QUERY);

  const handleDeleteClick = useCallback((transactionId: string) => {
    // eslint-disable-next-line no-alert
    const sureToDeleteRoomTransaction = confirm('Уверены, что хотите удалить перевод?');

    if (!sureToDeleteRoomTransaction) {
      return;
    }

    deleteRoomTransaction({
      variables: {
        roomId,
        transactionId,
      },
    });
  }, [deleteRoomTransaction, roomId]);

  return (
    <Root className={`${className} ${rootClassName}`}>
      <Heading level="4">Переводы</Heading>

      <div>
        {transactions.length ?
          transactions.map((transaction) => {
            const userNameFrom = getUserNameById(users, transaction.from);
            const userNameTo = getUserNameById(users, transaction.to);

            return (
              <div
                key={transaction.id}
                className="transactionItem"
              >
                {`${transaction.value} руб. ${userNameFrom} -> ${userNameTo}`}

                <DeleteIcon
                  className="deleteIcon"
                  onClick={handleDeleteClick.bind(null, transaction.id)}
                />
              </div>
            );
          }) :
          'Пока нет'
        }
      </div>
    </Root>
  );
};

export default React.memo(Transactions);
