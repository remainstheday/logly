import Footer from "components/Footer";
import Header from "components/Header";
import { GET_ALL_SITES } from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import React from "react";

export default function IndexPage({ sites }) {
  if (!sites) return <PageLoading />;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <main>
          {sites.map((site) => (
            <a href={`/${site.url}`} key={site.siteId}>
              {site.title}
            </a>
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

  return addApolloState(apolloClient, {
    props: {
      sites: sites.data.sites,
    },
    revalidate: 1,
  });
}
