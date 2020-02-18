import { gql } from 'apollo-boost';

export const GET_ROOMS_QUERY = gql`
  {
    rooms {
      id
      users
    }
  }
`;

export const ADD_ROOM_QUERY = gql`
  mutation addRoom($users: [String!]!) {
    addRoom(users: $users) {
      id
      users
    }
  }
`;
