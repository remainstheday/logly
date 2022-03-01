import React, { FC } from "react";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
// import "./layout.module.css";

import Head from "next/head";
// import { ApolloProvider } from "@apollo/client";
// import client from "../utils/graphql/apollo-client";

const styles = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

interface Props {
  pageTitle: string;
}

export const Layout: FC<Props> = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <style type="text/tailwindcss">{styles}</style>
      </Head>
      <div>
        <PageContainer header={pageTitle}>{children}</PageContainer>
      </div>
    </>
  );
};
