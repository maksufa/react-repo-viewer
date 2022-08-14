import { gql } from "@apollo/client";

export const GET_GITHUB_REPOS = gql`
  query GetGitHubRepos(
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    search(
      query: "react in: name"
      type: REPOSITORY
      first: $first
      last: $last
      after: $after
      before: $before
    ) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            name
            forkCount
            stargazerCount
            resourcePath
          }
        }
      }
    }
  }
`;
