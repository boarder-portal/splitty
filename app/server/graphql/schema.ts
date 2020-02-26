import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Cost {
    id: String!
    value: Int!
    from: String!
    to: [String!]!
  }

  type Room {
    id: ID!
    title: String!
    users: [User!]!
    costs: [Cost!]!
  }

  input CostInput {
    value: Int!
    from: String!
    to: [String!]!
  }

  type Query {
    room(roomId: String!): Room
    rooms: [Room!]!
  }

  type Mutation {
    createRoom(title: String!, names: [String!]!): Room!
    addRoomCost(roomId: String!, cost: CostInput): Room
  }
`;

export default typeDefs;
