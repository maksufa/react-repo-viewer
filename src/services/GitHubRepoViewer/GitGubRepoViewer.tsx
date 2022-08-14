import React, { useState } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import { useQuery } from "@apollo/client";

import { usePrevious, useUpdateEffect } from "react-use";
import { ColumnsType } from "antd/lib/table";
import styled from "styled-components";
import { GET_GITHUB_REPOS } from "./queries/queries";
import { PAGE_SIZE } from "./utils/constants";

// those interfaces are copied from GitHub public schema https://docs.github.com/en/graphql/overview/public-schema for the purpose of this task,
// however normally it's good to keep schema inside the app and transform it (GQL types) to TS e.g. using https://github.com/dotansimha/graphql-code-generator;
// this way we don't have to prepare it manually each time (and and at the same time we avoid mistakes/typos)
interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface ISearchResultItemConnection {
  search: {
    edges: [{ node: INode }];
    pageInfo: IPageInfo;
    repositoryCount: number;
  };
}

interface INode {
  id: string;
  name: string;
  resourcePath: string;
  forkCount: number;
  stargazerCount: number;
}

// hide interactive elements which work only with offset-based pagination
export const StyledTable = styled(Table)`
  .ant-pagination-item,
  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    display: none;
  }

  .ant-pagination-item-active {
    display: initial;
    pointer-events: none;
  }

  max-width: 800px;
`;

const COLUMNS: ColumnsType<INode> = [
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

function App() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const previousPageNumber = usePrevious(currentPageNumber);
  const [{ after, before, first, last }, setCursor] = useState<{
    after: null | string;
    before: null | string;
    first: null | number;
    last: null | number;
  }>({ after: null, before: null, first: PAGE_SIZE, last: null });

  // normally it would be also good to add support for errors when fetching the data (param 'error')
  const { loading, data } = useQuery<ISearchResultItemConnection>(
    GET_GITHUB_REPOS,
    {
      variables: {
        after,
        before,
        first,
        last,
      },
    }
  );

  useUpdateEffect(() => {
    if (data && previousPageNumber) {
      // check if user traverses through the repos forward or backward and set the proper cursor
      if (currentPageNumber > previousPageNumber) {
        setCursor({
          after: data.search.pageInfo.endCursor,
          before: null,
          first: PAGE_SIZE,
          last: null,
        });
      } else {
        setCursor({
          after: null,
          before: data.search.pageInfo.startCursor,
          first: null,
          last: PAGE_SIZE,
        });
      }
    }
  }, [currentPageNumber]);

  return (
    <StyledTable
      pagination={
        data && {
          total:
            parseInt((data.search.repositoryCount / PAGE_SIZE).toString(), 10) +
            1,
          pageSize: PAGE_SIZE,
          onChange: setCurrentPageNumber,
          current: currentPageNumber,
        }
      }
      loading={loading}
      dataSource={data?.search.edges.map((n: { node: INode }) => ({
        ...n.node,
        key: n.node.id,
      }))}
      columns={COLUMNS as object[]}
    />
  );
}

export default App;
