import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ICost, ITransaction, IUser } from 'common/types/room';

import Heading from 'client/components/common/Heading/Heading';

interface IUserBalance {
  userId: string;
  name: string;
  paid: number;
  shouldPay: number;
  transferred: number;
  received: number;
}

interface IRoomBalanceProps {
  className?: string;
  rootClassName: string;
  users: IUser[];
  costs: ICost[];
  transactions: ITransaction[];
}

const Balance: React.FC<IRoomBalanceProps> = (props) => {
  const {
    className,
    rootClassName,
    users,
    costs,
    transactions,
  } = props;

  const usersBalanceInfo: IUserBalance[] = useMemo(() => {
    const usersMapBalance = new Map<string, IUserBalance>();

    users.forEach((user) => {
      usersMapBalance.set(user.id, {
        userId: user.id,
        name: user.name,
        paid: 0,
        shouldPay: 0,
        transferred: 0,
        received: 0,
      });
    });

    costs.forEach((cost) => {
      const paidUser = usersMapBalance.get(cost.from);

      if (paidUser) {
        paidUser.paid += cost.value;
      }

      const borrowedValue = cost.value / cost.to.length;

      cost.to.forEach((borrowedUserId) => {
        const borrowedUser = usersMapBalance.get(borrowedUserId);

        if (borrowedUser) {
          borrowedUser.shouldPay += borrowedValue;
        }
      });
    });

    transactions.forEach((transaction) => {
      const paidUser = usersMapBalance.get(transaction.from);

      if (paidUser) {
        paidUser.transferred += transaction.value;
      }

      const borrowedUser = usersMapBalance.get(transaction.to);

      if (borrowedUser) {
        borrowedUser.received += transaction.value;
      }
    });

    return [...usersMapBalance.values()];
  }, [costs, transactions, users]);

  return (
    <div className={`${className} ${rootClassName}`}>
      <Heading level="4">Баланс</Heading>

      <div className="table">
        <div className="row">
          <div className="cell" />
          <div className="cell">Потратил</div>
          <div className="cell">Должен потратить</div>
          <div className="cell">Первевел</div>
          <div className="cell">Получил</div>
          <div className="cell">Итого</div>
        </div>

        {usersBalanceInfo.map(({
          userId,
          paid,
          shouldPay,
          transferred,
          received,
          name,
        }) => (
          <div
            className="row"
            key={userId}
          >
            <div>{name}</div>
            <div className="cell">{paid}</div>
            <div className="cell">{shouldPay}</div>
            <div className="cell">{transferred}</div>
            <div className="cell">{received}</div>
            <div className="cell">{paid + transferred - shouldPay - received}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default styled(Balance)`
  .table {
    display: table;
  }

  .row {
    display: table-row;
  }

  .cell {
    display: table-cell;
    padding: 4px;
  }
`;
