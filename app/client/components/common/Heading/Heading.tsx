import React from 'react';
import styled from 'styled-components';
import block from 'bem-cn';

interface IHeadingProps {
  className?: string;
  level: '1' | '2' | '3' | '4' | '5' | '6';
}

const b = block('Heading');

const Heading: React.FC<IHeadingProps> = (props) => {
  const {
    className,
    level,
    children,
  } = props;

  return (
    <div className={b({ level }).mix(className)}>
      {children}
    </div>
  );
};

export default styled(Heading)`
  font-weight: bold;
  line-height: 1.2;
  &.Heading_level {
    &_1 {
      font-size: 2.5rem;
    }
    &_2 {
      font-size: 2rem;
    }
    &_3 {
      font-size: 1.75rem;
    }
    &_4 {
      font-size: 1.5rem;
    }
    &_5 {
      font-size: 1.25rem;
    }
    &_6 {
      font-size: 1rem;
    }
  }
`;
