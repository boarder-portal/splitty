import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { sortBy } from 'lodash';

import { GET_ROOM_QUERY } from 'client/graphql/queries';

import { IRoom } from 'common/types/room';

import Transactions from 'client/components/Room/components/Transactions/Transactions';
import Balance from 'client/components/Room/components/Balance/Balance';
import Heading from 'client/components/common/Heading/Heading';
import Button from 'client/components/common/Button/Button';
import AddCostModal from 'client/components/Room/components/AddCostModal/AddCostModal';
import AddTransactionModal from 'client/components/Room/components/AddTransactionModal/AddTransactionModal';
import Costs from 'client/components/Room/components/Costs/Costs';
import History from 'client/components/Room/components/History/History';

import { useBoolean } from 'client/hooks/useBoolean';

interface IRouteParams {
  roomId: string;
}

interface IRoomProps {
  className?: string;
}

const Root = styled(Container)`
  .addCostButton,
  .addTransactionButton {
    display: block;
  }

  .addTransactionButton {
    margin-top: 8px;
  }

  .costs,
  .transactions,
  .balance,
  .history {
    margin-top: 12px;
  }
`;

const Room: React.FC<IRoomProps> = (props) => {
  const { className } = props;

  const {
    value: isAddCostModalOpen,
    setTrue: openAddCostModal,
    setFalse: closeAddCostModal,
  } = useBoolean(false);

  const {
    value: isAddTransactionModalOpen,
    setTrue: openAddTransactionModal,
    setFalse: closeAddTransactionModal,
  } = useBoolean(false);

  const {
    params: {
      roomId,
    },
  } = useRouteMatch<IRouteParams>();

  const {
    data: roomData,
  } = useQuery<{ room: IRoom | null }, { roomId: string }>(GET_ROOM_QUERY, {
    variables: {
      roomId,
    },
  });

  const room = roomData?.room;

  const historyItems = useMemo(() => {
    if (!room) {
      return [];
    }

    return sortBy([...room.costHistoryItems, ...room.transactionHistoryItems], (item) => {
      const { date } = item;

      if (!date) {
        return -Infinity;
      }

      return Number(new Date(date));
    });
  }, [room]);

  if (!roomData) {
    return null;
  }

  if (!room) {
    return <div>Нет такой комнаты</div>;
  }

  const {
    title,
    users,
    costs,
    transactions,
  } = room;

  return (
    <Root className={className}>
      <Heading level="1">{title}</Heading>

      <Button
        className="addCostButton"
        onClick={openAddCostModal}
      >
        Добавить трату
      </Button>

      <Button
        className="addTransactionButton"
        onClick={openAddTransactionModal}
      >
        Добавить перевод
      </Button>

      <Costs
        rootClassName="costs"
        costs={costs}
        users={users}
      />

      <Transactions
        rootClassName="transactions"
        users={users}
        transactions={transactions}
      />

      <Balance
        rootClassName="balance"
        users={users}
        costs={costs}
        transactions={transactions}
      />

      {Boolean(historyItems.length) && <History
        rootClassName="history"
        items={historyItems}
        users={users}
      />}

      <AddCostModal
        roomId={roomId}
        users={users}
        isOpen={isAddCostModalOpen}
        onClose={closeAddCostModal}
      />

      <AddTransactionModal
        roomId={roomId}
        users={users}
        isOpen={isAddTransactionModalOpen}
        onClose={closeAddTransactionModal}
      />
    </Root>
  );
};

export default React.memo(Room);
