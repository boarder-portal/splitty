import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

interface IUsersProps {
  className?: string;
  rootClassName: string;
  names: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const Users: React.FC<IUsersProps> = (props) => {
  const {
    className,
    rootClassName,
    names,
    onChange,
  } = props;

  const [userName, setUserName] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }, []);

  const addUser = useCallback(() => {
    setUserName('');

    onChange((prevNames: string[]) => [
      ...prevNames,
      userName,
    ]);
  }, [onChange, userName]);

  const removeUser = useCallback((name) => {
    onChange((prevNames: string[]) => prevNames.filter((prevName) => prevName !== name));
  }, [onChange]);

  return (
    <div className={`${className} ${rootClassName}`}>
      <div>
        {names.map((name, index) => (
          <Chip
            key={index}
            className="name"
            icon={<FaceIcon />}
            label={name}
            onDelete={() => removeUser(name)}
            variant="outlined"
          />
        ))}
      </div>

      <Box display="flex">
        <TextField
          label="Имя участника"
          value={userName}
          onChange={handleChange}
        />

        <Button
          className="addUserButton"
          variant="contained"
          color="default"
          disabled={!userName}
          onClick={addUser}
        >
          Добавить
        </Button>
      </Box>
    </div>
  );
};

export default styled(Users)`
  .name:not(:first-child) {
    margin-left: 8px;
  }

  .addUserButton {
    align-self: flex-end;
    cursor: pointer;
    margin-left: 20px;
  }
`;
