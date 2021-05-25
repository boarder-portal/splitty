import { gql } from 'apollo-boost';

const ROOM_FIELDS = `
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
    description
    date
  }
  transactions {
    id
    value
    from
    to
    date
  }
`;

export const GET_ROOM_QUERY = gql`
  query getRoom($roomId: String!) {
    room(roomId: $roomId) {
      ${ROOM_FIELDS}
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
      ${ROOM_FIELDS}
    }
  }
`;

export const ADD_ROOM_TRANSACTION_QUERY = gql`
  mutation addRoomTransaction($roomId: String!, $transaction: TransactionInput!) {
    addRoomTransaction(roomId: $roomId, transaction: $transaction) {
      ${ROOM_FIELDS}
    }
  }
`;

export const DELETE_ROOM_COST_QUERY = gql`
  mutation deleteRoomCost($roomId: String!, $costId: String!) {
    deleteRoomCost(roomId: $roomId, costId: $costId) {
      ${ROOM_FIELDS}
    }
  }
`;

export const DELETE_ROOM_TRANSACTION_QUERY = gql`
  mutation deleteRoomTransaction($roomId: String!, $transactionId: String!) {
    deleteRoomTransaction(roomId: $roomId, transactionId: $transactionId) {
      ${ROOM_FIELDS}
    }
  }
`;

