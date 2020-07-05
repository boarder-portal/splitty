import React from 'react';
import styled from 'styled-components';

import { ITransaction, IUser } from 'common/types/room';

import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomTransactionsProps {
  className?: string;
  rootClassName: string;
  transactions: ITransaction[];
  users: IUser[];
}

const Transactions: React.FC<IRoomTransactionsProps> = (props) => {
  const {
    className,
    rootClassName,
    transactions,
    users,
  } = props;

  return (
    <div className={`${className} ${rootClassName}`}>
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
  );
};

export default styled(Transactions)`
  .transactionItem:not(:first-child) {
    margin-top: 4px;
  }
`;
