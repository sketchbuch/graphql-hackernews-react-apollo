import gql from 'graphql-tag';

export const feedQuery = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`