import { gql } from "@apollo/client";

export const GET_GITHUB_REPOS = gql`
  query GetGitHubRepos {
    search(query: "react in:name", type: REPOSITORY, first: 10) {
      repositoryCount
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
