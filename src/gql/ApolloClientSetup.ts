import { ApolloClient, InMemoryCache } from "@apollo/client";

const GQLClient = new ApolloClient({
  // normally this kind of info (API URIs) we keep in env files or fetch it dynamically from the BE
  uri: "https://api.github.com/graphql",
  headers: {
    // put below your Github Personal Access Token to enable GQL queries - https://docs.github.com/en/graphql/guides/forming-calls-with-graphql
    authorization: "Bearer <Your Personal Access Token>",
  },
  // prevent by refetching repos when traversing through those which have been already fetched
  cache: new InMemoryCache(),
});

export default GQLClient;
