import React from 'react';
import styled from 'styled-components';

import Heading from 'client/components/common/Heading/Heading';

interface IHeaderProps {
  className?: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={className}>
      <Heading level="5">Splitty</Heading>
    </div>
  );
};

export default styled(Header)`
  padding: 12px 32px;
`;
