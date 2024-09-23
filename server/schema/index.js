import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Track {
    id: ID!
    name: String!
    url: String!
  }

  type Query {
    tracks: [Track]
  }
`;

export default typeDefs;
