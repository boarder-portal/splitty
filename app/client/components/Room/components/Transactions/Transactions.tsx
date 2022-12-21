import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import dayjs from 'dayjs';

import { DELETE_ROOM_TRANSACTION_QUERY } from 'client/graphql/queries';

import { IRoom, ITransaction, IUser } from 'common/types/room';
import { IDeleteRoomTransactionParams } from 'common/types/requestParams';

import { HUMAN_DATE_FORMAT } from 'common/utilities/date/formats';
import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';
import useLastDaysList from 'client/components/Room/hooks/useLastDaysList';

interface IRoomTransactionsProps {
  className?: string;
  rootClassName: string;
  transactions: ITransaction[];
  users: IUser[];
}

const Root = styled.div`
  .content {
    margin-top: 8px;
  }

  .transactionItem {
    line-height: 1.33;

    &.withDate:not(:first-child) {
      margin-top: 4px;
    }
  }

  .transactionItemContent {
    display: flex;
    align-items: center;
  }

  .deleteIcon {
    margin-left: auto;
    padding-left: 4px;
  }

  .expander {
    cursor: pointer;
    color: cornflowerblue;
    margin-top: 8px;
  }
`;

export function getTransactionText(transaction: ITransaction, users: IUser[]) {
  const userNameFrom = getUserNameById(users, transaction.from);
  const userNameTo = getUserNameById(users, transaction.to);

  return `${transaction.value} ${userNameFrom} -> ${userNameTo}`;
}

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

  const sortedTransactions = useMemo(() => transactions.reverse(), [transactions]);

  const {
    visibleItems: visibleTransactions,
    expanded,
    expand,
  } = useLastDaysList(sortedTransactions);

  return (
    <Root className={`${className} ${rootClassName}`}>
      <Heading level="4">Переводы</Heading>

      <div className="content">
        {visibleTransactions.length ?
          visibleTransactions.map((transaction, index) => {
            const withDate = index === 0 || !dayjs(transaction.date).isSame(visibleTransactions[index - 1].date, 'day');

            return (
              <div
                key={transaction.id}
                className={`transactionItem ${withDate ? 'withDate' : ''}`}
              >
                {withDate && transaction.date && (
                  <Heading
                    className="date"
                    level="6"
                  >
                    {dayjs(transaction.date).format(HUMAN_DATE_FORMAT)}
                  </Heading>
                )}

                <div className="transactionItemContent">
                  {getTransactionText(transaction, users)}

                  <DeleteIcon
                    className="deleteIcon"
                    onClick={handleDeleteClick.bind(null, transaction.id)}
                  />
                </div>
              </div>
            );
          }) :
          'Пока нет'
        }

        {!expanded && visibleTransactions.length !== sortedTransactions.length && <div className="expander" onClick={expand}>Развернуть</div>}
      </div>
    </Root>
  );
};

export default React.memo(Transactions);
