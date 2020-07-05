import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

import Heading from 'client/components/common/Heading/Heading';

interface IHeaderProps {
  className?: string;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const { className } = props;

  return (
    <Container className={className}>
      <Heading level="5">
        <Link to="/">Splitty</Link>
      </Heading>
    </Container>
  );
};

export default styled(Header)`
  padding-top: 12px;
  padding-bottom: 12px;
`;
