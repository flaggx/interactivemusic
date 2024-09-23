import { gql } from '@apollo/client';

export const GET_TRACKS = gql`
  query GetTracks {
    tracks {
      id
      name
      url
    }
  }
`;
