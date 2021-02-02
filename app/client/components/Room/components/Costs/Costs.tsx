import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/react-hooks';

import { DELETE_ROOM_COST_QUERY } from 'client/graphql/queries';

import { ICost, IRoom, IUser } from 'common/types/room';
import { IDeleteRoomCostParams } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomCostsProps {
  className?: string;
  rootClassName: string;
  costs: ICost[];
  users: IUser[];
}

const Root = styled.div`
  .costItem {
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

const Costs: React.FC<IRoomCostsProps> = (props) => {
  const {
    className,
    rootClassName,
    costs,
    users,
  } = props;

  const { roomId } = useParams<{ roomId: string }>();

  const [deleteRoomCost] = useMutation<{ deleteRoomCost: IRoom }, IDeleteRoomCostParams>(DELETE_ROOM_COST_QUERY);

  const handleDeleteClick = useCallback((costId: string) => {
    // eslint-disable-next-line no-alert
    const sureToDeleteRoomCost = confirm('Уверены, что хотите удалить трату?');

    if (!sureToDeleteRoomCost) {
      return;
    }

    deleteRoomCost({
      variables: {
        roomId,
        costId,
      },
    });
  }, [deleteRoomCost, roomId]);

  return (
    <Root className={`${className} ${rootClassName}`}>
      <Heading level="4">Затраты</Heading>

      <div>
        {costs.length ?
          costs.map((cost) => {
            const fromUserName = getUserNameById(users, cost.from);

            return (
              <div
                key={cost.id}
                className="costItem"
              >
                {`${cost.value} руб. ${fromUserName} -> ${
                  cost.to.map((id) => getUserNameById(users, id)).join(', ')
                }${cost.description ? ` (${cost.description})` : ''}`}

                <DeleteIcon
                  className="deleteIcon"
                  onClick={handleDeleteClick.bind(null, cost.id)}
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

export default React.memo(Costs);
