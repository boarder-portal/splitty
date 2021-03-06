import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Cost {
    id: String!
    value: Float!
    from: String!
    to: [String!]!
    description: String
    date: String
  }

  type Transaction {
    id: String!
    value: Float!
    from: String!
    to: String!
    date: String
  }

  type Room {
    id: ID!
    title: String!
    users: [User!]!
    costs: [Cost!]!
    transactions: [Transaction!]!
  }

  input CostInput {
    value: Float!
    from: String!
    to: [String!]!
    description: String
  }

  input TransactionInput {
    value: Float!
    from: String!
    to: String!
  }

  type Query {
    room(roomId: String!): Room
    rooms: [Room!]!
  }

  type Mutation {
    createRoom(title: String!, names: [String!]!): Room!
    addRoomCost(roomId: String!, cost: CostInput): Room
    addRoomTransaction(roomId: String!, transaction: TransactionInput): Room
    deleteRoomCost(roomId: String!, costId: String!): Room!
    deleteRoomTransaction(roomId: String!, transactionId: String!): Room!
  }
`;

export default typeDefs;
