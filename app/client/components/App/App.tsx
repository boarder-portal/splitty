import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { ADD_ROOM_QUERY, GET_ROOMS_QUERY } from 'client/graphql/queries';

interface IAppProps {
  className?: string;
}

interface IRoomResponse {
  rooms: {
    id: string;
    users: string[];
  }[];
}

const App: React.FC<IAppProps> = (props) => {
  const {
    data: roomsData,
    loading: roomsLoading,
    error: roomsError
  } = useQuery<IRoomResponse>(GET_ROOMS_QUERY);

  const rooms = roomsData?.rooms;

  console.log({ roomsData, roomsLoading, roomsError });

  const [
    addRoom, {
      data: addRoomData,
      loading: addRoomLoading,
      error: addRoomError
    }
  ] = useMutation(ADD_ROOM_QUERY);

  console.log({ addRoomData, addRoomLoading, addRoomError });

  if (roomsLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (roomsError) {
    return (
      <div>Error :(</div>
    );
  }

  return (
    <div className={props.className}>
      <div>Rooms:</div>

      {rooms?.map(({ id, users }) => (
        <div key={id}>{id}: {users.join(', ')}</div>
      ))}

      <button onClick={() => addRoom({
        variables: {
          users: [Math.random().toFixed(2), Math.random().toFixed(2)]
        },
        refetchQueries: [{ query: GET_ROOMS_QUERY }]
      })}>
        Добавить
      </button>
    </div>
  )
};

export default styled(App)`
  color: tomato;
`;
