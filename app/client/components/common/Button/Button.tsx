import React from 'react';
import MuiButton from '@material-ui/core/Button';

interface IButtonProps {
  className?: string;
  children: React.ReactNode;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick(): void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const {
    className,
    disabled = false,
    type = 'primary',
    children,
    onClick,
  } = props;

  return (
    <MuiButton
      className={className}
      variant={type === 'primary' ? 'contained' : 'outlined'}
      color="primary"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default React.memo(Button);
