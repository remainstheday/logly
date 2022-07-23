import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import { GET_SITE_CONTENT, GET_SITE_LOGO } from "apollo/api";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";
import React from "react";
import PosterImage from "../../../components/PosterImage";

export default function About({ logo, content }) {
  const { query } = useRouter();
  if (!content) return <PageLoading siteId={query.site} />;

  return (
    <>
      <Header siteId={query.site} logo={logo} />
      <div className="max-w-4xl mx-auto min-h-screen">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle largeText={content.title} />
          <div className="mt-6">
            {content.staticPageImages && (
              <PosterImage
                image={content.staticPageImages}
                title={content.title}
              />
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

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const siteContents = await apolloClient.query({
    query: GET_SITE_LOGO,
    variables: { siteId: params.site },
  });
  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });
  return addApolloState(apolloClient, {
    props: {
      logo: siteContents.data.siteContents[1],
      content: content.data.siteContents.find(
        (item) => item.url === `${params.site}/about`
      ),
    },
  });
}
