import { gql } from 'apollo-server';

const typeDefs = gql`
  type Room {
    id: ID!
    users: [String!]!
  }

  type Query {
    rooms: [Room!]!
  }

  type Mutation {
    addRoom(users: [String!]!): Room!
  }
`;

export default typeDefs;
