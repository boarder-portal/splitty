import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_ROOM_QUERY } from 'client/graphql/queries';

import { IRoom } from 'common/types/room';
import { ICreateRoomParams } from 'common/types/requestParams';

import Title from 'client/components/Home/components/Title/Title';
import Users from 'client/components/Home/components/Users/Users';

interface IHomeProps {
  className?: string;
}

const Home: React.FC<IHomeProps> = (props) => {
  const { className } = props;

  const history = useHistory();

  const [roomTitle, setRoomTitle] = useState('');
  const [usersNames, setUsersNames] = useState<string[]>([]);

  const [
    createRoom,
    {
      data: newRoomData,
      loading: isCreateRoomLoading,
    },
  ] = useMutation<{ createRoom: Pick<IRoom, 'id'> }, ICreateRoomParams>(CREATE_ROOM_QUERY);

  const newRoomId = newRoomData?.createRoom.id;

  const handleCreateRoomClick = useCallback(() => {
    createRoom({
      variables: {
        names: usersNames,
        title: roomTitle,
      },
    });
  }, [createRoom, roomTitle, usersNames]);

  useEffect(() => {
    if (newRoomId) {
      history.push(`/room/${newRoomId}`);
    }
  }, [history, newRoomId]);

  return (
    <div className={className}>
      <Title
        title={roomTitle}
        onChange={setRoomTitle}
      />

      <Users
        rootClassName="users"
        names={usersNames}
        onChange={setUsersNames}
      />

      <button
        className="createRoomButton"
        onClick={handleCreateRoomClick}
        disabled={isCreateRoomLoading}
      >
        Создать комнату
      </button>
    </div>
  );
};

export default styled(Home)`
  padding: 0 32px;

  .users,
  .createRoomButton {
    margin-top: 12px;
  }
`;
