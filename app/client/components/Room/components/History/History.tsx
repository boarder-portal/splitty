import React  from 'react';
import styled from 'styled-components';

import { EHistoryType, isCostHistoryItem, IUser, THistoryItem } from 'common/types/room';

import Heading from 'client/components/common/Heading/Heading';
import { getCostText } from 'client/components/Room/components/Costs/Costs';
import { getTransactionText } from 'client/components/Room/components/Transactions/Transactions';

interface IHistoryProps {
  className?: string;
  rootClassName: string;
  items: THistoryItem[];
  users: IUser[];
}

const Root = styled.div`
  .item {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`;

const HISTORY_ITEM_TYPE_TITLE = {
  [EHistoryType.ADD_COST]: 'Добавлена трата',
  [EHistoryType.ADD_TRANSACTION]: 'Добавлен перевод',
  [EHistoryType.DELETE_COST]: 'Удалена трата',
  [EHistoryType.DELETE_TRANSACTION]: 'Удален перевод',
};

const History: React.FC<IHistoryProps> = (props) => {
  const {
    className,
    rootClassName,
    items,
    users,
  } = props;

  return (
    <Root className={`${className} ${rootClassName}`}>
      <Heading level="4">История</Heading>

      <div>
        {items.map((item, index) => {
          return (
            <div key={index} className="item">
              <div>{HISTORY_ITEM_TYPE_TITLE[item.type]}</div>

              <div>{isCostHistoryItem(item) ? getCostText(item.data, users) : getTransactionText(item.data, users)}</div>
            </div>
          );
        })}
      </div>
    </Root>
  );
};

export default React.memo(History);
