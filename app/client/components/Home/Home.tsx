import React, { useCallback } from 'react';

const Home: React.FC = () => {
  const handleCreateRoomClick = useCallback(() => {
    console.log('Add room');
  }, []);

  return (
    <div>
      <div>Splity</div>

      <button onClick={handleCreateRoomClick}>Создать комнату</button>
    </div>
  );
};

export default Home;
