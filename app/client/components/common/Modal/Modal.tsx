import React from 'react';
import MuiModal from '@material-ui/core/Modal';
import styled from 'styled-components';

interface IModalProps {
  className?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose(): void;
}

const Modal: React.FC<IModalProps> = (props) => {
  const {
    className,
    isOpen,
    children,
    onClose,
  } = props;

  return (
    <MuiModal
      className={className}
      open={isOpen}
      onClose={onClose}
    >
      <div className="container">
        {children}
      </div>
    </MuiModal>
  );
};

export default styled(React.memo(Modal))`
  .container {
    height: 100vh;
    width: 100vw;
    background: white;
    outline: none;
  }
`;
