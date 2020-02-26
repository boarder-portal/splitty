import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_ROOM_QUERY } from 'client/graphql/queries';

import { ICreateRoomParams } from 'server/graphql/resolvers';
import { IRoom } from 'common/types/room';

const Home: React.FC = () => {
  const history = useHistory();

  const [roomTitle, setRoomTitle] = useState('');
  const [usersNames, setUsersNames] = useState(['', '']);

  const [
    createRoom,
    {
      data: newRoomData,
      loading: createRoomLoading
    }
  ] = useMutation<{ createRoom: Pick<IRoom, 'id'> }, ICreateRoomParams>(CREATE_ROOM_QUERY);

  const newRoomId = newRoomData?.createRoom.id;

  const handleRoomTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  }, []);

  const handleUserNameChange = useCallback((userIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersNames([
      ...usersNames.slice(0, userIndex),
      e.target.value,
      ...usersNames.slice(userIndex + 1)
    ]);
  }, [usersNames]);

  const handleCreateRoomClick = useCallback(() => {
    createRoom({
      variables: {
        names: usersNames,
        title: roomTitle
      }
    });
  }, [createRoom, roomTitle, usersNames]);

  useEffect(() => {
    if (newRoomId) {
      history.push(`/room/${newRoomId}`);
    }
  }, [history, newRoomId]);

  return (
    <div>
      <h1>Splitty</h1>

      <div>
        <div>Название комнаты (поездка, кафе)</div>

        <input
          value={roomTitle}
          onChange={handleRoomTitleChange}
        />
      </div>

      <div>
        <div>Имена участников</div>

        {usersNames.map((name, index) => {
          return (
            <div key={index}>
              <input
                value={name}
                onChange={handleUserNameChange.bind(null, index)}
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={handleCreateRoomClick}
        disabled={createRoomLoading}
      >
        Создать комнату
      </button>
    </div>
  );
};

export default Home;
