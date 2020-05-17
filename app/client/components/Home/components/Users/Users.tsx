import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Heading from 'client/components/common/Heading/Heading';

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

  return (
    <div className={`${className} ${rootClassName}`}>
      <Heading level="6">Имена участников</Heading>

      <div>
        {names.map((name, index) => (
          <div key={index} className="name">{name}</div>
        ))}
      </div>

      <input
        value={userName}
        onChange={handleChange}
      />

      <button
        className="addUserButton"
        onClick={addUser}
      >
        Добавить
      </button>
    </div>
  );
};

export default styled(Users)`
  .name {
    margin-bottom: 8px;
  }

  .addUserButton {
    margin-left: 12px;
  }
`;
