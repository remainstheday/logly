import { GET_EXPERIENCES_BY_SITE_ID, GET_SITE_LOGO } from "apollo/api";
import Header from "components/Header";
import Footer from "components/Footer";
import BackLink from "components/BackLink";
import React from "react";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import { useRouter } from "next/router";
import Section from "components/Section";
import RelatedItemsGrid from "components/RelatedItemsGrid";

export default function Experiences({ experiences, logo }) {
  const { query } = useRouter();
  if (!experiences) return <PageLoading siteId={query.site} />;
  return (
    <>
      <Header siteId={query.site} logo={logo} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle smallText={"Pick Your"} largeText={"Experience"} />

          {experiences.length > 0 && (
            <div className="w-full mt-4">
              <RelatedItemsGrid items={experiences} />
            </div>
          )}
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
  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });

  const filteredExperiences = experiences.data.experiences
    .map((experience) => ({
      ...experience,
      image: experience.experienceImages,
    }))
    .filter((experience) => experience.status === "published");

  return addApolloState(apolloClient, {
    props: {
      logo: siteContents.data.siteContents[1],
      experiences: filteredExperiences,
    },
  });
}
