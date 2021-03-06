import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from '@apollo/react-hooks';
import dayjs from 'dayjs';

import { DELETE_ROOM_COST_QUERY } from 'client/graphql/queries';

import { ICost, IRoom, IUser } from 'common/types/room';
import { IDeleteRoomCostParams } from 'common/types/requestParams';

import getUserNameById from 'client/utilities/getUserNameById';
import { HUMAN_DATE_FORMAT } from 'common/utilities/date/formats';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomCostsProps {
  className?: string;
  rootClassName: string;
  costs: ICost[];
  users: IUser[];
}

const Root = styled.div`
  .costItem {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }

  .content {
    display: flex;
    align-items: center;
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
                {cost.date && (
                  <Heading
                    className="date"
                    level="6"
                  >
                    {dayjs(cost.date).format(HUMAN_DATE_FORMAT)}
                  </Heading>
                )}

                <div className="content">
                  {`${cost.value} руб. ${fromUserName} -> ${
                    cost.to.map((id) => getUserNameById(users, id)).join(', ')
                  }${cost.description ? ` (${cost.description})` : ''}`}

                  <DeleteIcon
                    className="deleteIcon"
                    onClick={handleDeleteClick.bind(null, cost.id)}
                  />
                </div>
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
