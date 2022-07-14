import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import { GET_ALL_SITES, GET_SITE_CONTENT } from "apollo/api";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";
import React from "react";

export default function About({ siteLogo, content }) {
  const { query } = useRouter();
  if (!content) return <PageLoading />;

  return (
    <>
      <Header
        siteId={query.site}
        logo={{
          url: siteLogo.siteLogo,
          width: siteLogo.logoWidth,
          height: siteLogo.logoHeight,
        }}
      />
      <div className="max-w-4xl mx-auto min-h-screen">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle largeText={content.title} />
          <div className="mt-6">
            {content.staticPageImages && (
              <div className="mt-16 mb-8 aspect-w-16 aspect-h-9">
                <img src={content.staticPageImages} alt={content.title} />
              </div>
            )}
            {content.description && (
              <div className="wysiwyg-editor">
                <DocumentRenderer document={content.description.document} />
              </div>
            )}
          </div>
        </Section>
      </div>
      <Footer siteId={query.site} />
    </>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_SITES,
  });

  const paths =
    data.sites.map((item) => ({
      params: { site: `${item.url}` },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });

  return addApolloState(apolloClient, {
    props: {
      siteLogo: content.data.siteContents.find((item) => item.name === "Home"),
      content: content.data.siteContents.find(
        (item) => item.url === `${params.site}/about`
      ),
    },
    revalidate: 1,
  });
}
