import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';

interface ITitleProps {
  title: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const Title: React.FC<ITitleProps> = (props) => {
  const {
    title,
    onChange,
  } = props;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <TextField
      label="Название комнаты"
      value={title}
      onChange={handleChange}
    />
  );
};

export default Title;
