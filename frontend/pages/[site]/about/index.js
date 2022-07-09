import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import { GET_ALL_SITES, GET_SITE_CONTENT } from "apollo/api";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import Image from "next/image";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";
import React from "react";

const customLoader = ({ src }) => {
  return src;
};

export default function About({ content }) {
  const { query } = useRouter();
  if (!content) return <PageLoading />;

  return (
    <>
      <Header siteId={query.site} />
      <div className="max-w-4xl mx-auto min-h-screen">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle largeText={content.title} />
          <div className="mt-6">
            {content.staticPageImages && (
              <div className="flex relative my-16">
                <Image
                  loader={customLoader}
                  src={content.staticPageImages}
                  width="1080"
                  height="720"
                  alt={content.title}
                />
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
      content: content.data.siteContents.find(
        (item) => item.url === `${params.site}/about`
      ),
    },
    revalidate: 1,
  });
}
