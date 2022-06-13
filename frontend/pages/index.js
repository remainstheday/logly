import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import { GET_ALL_SITES } from "apollo/api";
import Image from "next/image";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import CommentCard from "components/CommentCard";
import React from "react";
import Link from "next/link";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";

export default function IndexPage({ sites }) {
  if (!sites) return <PageLoading />;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <main>
          {sites.map((site) => (
            <h1 key={site.siteId}>{site.title}</h1>
          ))}
        </main>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const sites = await apolloClient.query({
    query: GET_ALL_SITES,
  });

  console.log(sites);

  return addApolloState(apolloClient, {
    props: {
      sites: sites.data.sites,
    },
    revalidate: 1,
  });
}
