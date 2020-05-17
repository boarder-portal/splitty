import React, { useCallback } from 'react';

import Heading from 'client/components/common/Heading/Heading';

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
    <div>
      <Heading level="6">Название комнаты (поездка, кафе)</Heading>

      <input
        value={title}
        onChange={handleChange}
      />
    </div>
  );
};

export default Title;
