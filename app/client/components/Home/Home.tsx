import React, { useCallback, useState } from 'react';

const Home: React.FC = () => {
  const [roomName, setRoomName] = useState('');

  const handleRoomNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  }, []);

  const handleCreateRoomClick = useCallback(() => {
    console.log('Add room');
  }, []);

  return (
    <div>
      <h1>Splity</h1>

      <div>
        <div>Введите название комнаты (поезда, кафе)</div>

        <input
          value={roomName}
          onChange={handleRoomNameChange}
        />
      </div>

      <button onClick={handleCreateRoomClick}>Создать комнату</button>
    </div>
  );
};

export default Home;
