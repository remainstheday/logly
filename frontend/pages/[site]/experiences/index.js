import { GET_ALL_SITES, GET_EXPERIENCES_BY_SITE_ID } from "apollo/api";
import Header from "components/Header";
import Footer from "components/Footer";
import Thumbnail from "components/Thumbnail";
import BackLink from "components/BackLink";
import React from "react";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import { useRouter } from "next/router";
import Section from "components/Section";

export default function Experience({ experiences }) {
  const { query } = useRouter();
  if (!experiences) return <PageLoading />;
  return (
    <>
      <Header siteId={query.site} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle smallText={"Pick Your"} largeText={"Experience"} />

          <div className="mt-6 grid grid-cols-2 gap-4">
            {experiences.map((experience) => (
              <div key={experience.id}>
                <Thumbnail
                  href={experience.url}
                  title={experience.title}
                  image={
                    experience.experienceImages
                      ? experience.experienceImages
                      : "/stock-museum-1.jpg"
                  }
                  imgWidth={700}
                  imgHeight={512}
                />
              </div>
            ))}
          </div>
        </Section>
      </div>
      <Footer siteId={query.site} />
    </>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const sites = await apolloClient.query({
    query: GET_ALL_SITES,
  });
  const paths =
    sites.data.sites.map((item) => ({
      params: { site: item.url },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });

  return addApolloState(apolloClient, {
    props: {
      experiences: experiences.data.experiences.filter(
        (experience) => experience.status === "published"
      ),
    },
    revalidate: 1,
  });
}
