import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { useQuery } from "@apollo/client";

import { GET_GITHUB_REPOS } from "./queries/queries";

function App() {
  const COLUMNS = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Stars",
      dataIndex: "stargazerCount",
      key: "stargazerCount",
    },
    {
      title: "Forks",
      dataIndex: "forkCount",
      key: "forkCount",
    },
  ];

  // normally it would be also good to add support for errors when fetching the data (param 'error')
  const { loading, data } = useQuery(GET_GITHUB_REPOS, {
    variables: {
      first: 100,
    },
  });

  return (
    <Table
      loading={loading}
      // TODO: correct any type
      dataSource={data?.search.edges.map((n: { node }) => ({
        ...n.node,
        key: n.node.id,
      }))}
      columns={COLUMNS}
    />
  );
}

export default App;
