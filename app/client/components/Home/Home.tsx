import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { CREATE_ROOM_QUERY } from 'client/graphql/queries';

import { IRoom } from 'common/types/room';
import { ICreateRoomParams } from 'common/types/requestParams';

import Title from 'client/components/Home/components/Title/Title';
import Users from 'client/components/Home/components/Users/Users';
import Heading from 'client/components/common/Heading/Heading';

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

  const handleCreateRoomClick = useCallback((e) => {
    e.preventDefault();

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
    <Container className={className}>
      <form onSubmit={handleCreateRoomClick}>
        <Heading level="1">Создать комнату</Heading>

        <Title
          className="nameInput"
          title={roomTitle}
          onChange={setRoomTitle}
        />

        <Users
          rootClassName="users"
          names={usersNames}
          onChange={setUsersNames}
        />

        <Button
          type="submit"
          className="createRoomButton"
          variant="contained"
          color="primary"
          disabled={isCreateRoomLoading || !roomTitle || usersNames.length < 2}
        >
          Создать комнату
        </Button>
      </form>

      {(window as any).rooms.length ? (
        <div className="myRooms">
          <Heading level="2">Мои комнаты</Heading>

          {(window as any).rooms.reverse().map(({ id, title }: { id: string; title: string }) => (
            <div className="myRoom" key={id}>
              <Link to={`/room/${id}`}>{title}</Link>
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default styled(Home)`
  .container {
    padding-top: 20px;
    padding-bottom: 32px;
  }

  .nameInput {
    width: 100%;
  }

  .users {
    margin-top: 12px;
  }

  .createRoomButton {
    margin-top: 20px;
  }

  .myRooms {
    margin-top: 20px;
  }

  .myRoom:not(:first-child) {
    margin-top: 8px;
  }
`;
