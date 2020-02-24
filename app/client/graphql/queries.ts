import { gql } from 'apollo-boost';

export const GET_ROOMS_QUERY = gql`
  {
    rooms {
      id
      users
    }
  }
`;

export const CREATE_ROOM_QUERY = gql`
  mutation createRoom($title: String!, $users: [String!]!) {
    createRoom(title: $title, users: $users) {
      id
    }
  }
`;
