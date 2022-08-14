import React from "react";
import { ApolloProvider } from "@apollo/client";
import GQLClient from "./gql/ApolloClientSetup";
import GitGubRepoViewer from "./services/GitHubRepoViewer/GitGubRepoViewer";

export default function Root() {
  return (
    <ApolloProvider client={GQLClient}>
      <GitGubRepoViewer />
    </ApolloProvider>
  );
}
