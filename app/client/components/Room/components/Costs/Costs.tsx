import React from 'react';
import styled from 'styled-components';

import { ICost, IUser } from 'common/types/room';

import getUserNameById from 'client/utilities/getUserNameById';

import Heading from 'client/components/common/Heading/Heading';

interface IRoomCostsProps {
  className?: string;
  rootClassName: string;
  costs: ICost[];
  users: IUser[];
}

const Costs: React.FC<IRoomCostsProps> = (props) => {
  const {
    className,
    rootClassName,
    costs,
    users,
  } = props;

  return (
    <div className={`${className} ${rootClassName}`}>
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
              </div>
            );
          }) :
          'Пока нет'
        }
      </div>
    </div>
  );
};

export default styled(Costs)`
  .costItem {
    line-height: 1.33;

    &:not(:first-child) {
      margin-top: 4px;
    }
  }
`;
