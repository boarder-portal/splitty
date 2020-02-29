import { gql } from 'apollo-boost';

export const GET_ROOM_QUERY = gql`
  query getRoom($roomId: String!) {
    room(roomId: $roomId) {
      id
      title
      users {
        id
        name
      }
      costs {
        id
        value
        from
        to
      }
      transactions {
        id
        value
        from
        to
      }
    }
  }
`;

export const CREATE_ROOM_QUERY = gql`
  mutation createRoom($title: String!, $names: [String!]!) {
    createRoom(title: $title, names: $names) {
      id
    }
  }
`;

export const ADD_ROOM_COST_QUERY = gql`
  mutation addRoomCost($roomId: String!, $cost: CostInput!) {
    addRoomCost(roomId: $roomId, cost: $cost) {
      id
      title
      users {
        id
        name
      }
      costs {
        id
        value
        from
        to
      }
      transactions {
        id
        value
        from
        to
      }
    }
  }
`;

export const ADD_ROOM_TRANSACTION_QUERY = gql`
  mutation addRoomTransaction($roomId: String!, $transaction: TransactionInput!) {
    addRoomTransaction(roomId: $roomId, transaction: $transaction) {
      id
      title
      users {
        id
        name
      }
      costs {
        id
        value
        from
        to
      }
      transactions {
        id
        value
        from
        to
      }
    }
  }
`;

