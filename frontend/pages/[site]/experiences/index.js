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

export default function Experience({ experiences }) {
  const { query } = useRouter();
  console.log(query);
  if (!experiences) return <PageLoading />;
  return (
    <>
      <div className="max-w-4xl mx-auto min-h-screen">
        <Header />
        <BackLink href={"/"} text={"Home"} />
        <PageTitle smallText={"Pick Your"} largeText={"Experience"} />
        <section className="mt-4 px-6 mt-10 mx-auto">
          <div className="mt-6 grid grid-cols-2 gap-4">
            {experiences.map((experience) => (
              <div key={experience.id}>
                <Thumbnail
                  href={`/${query.site}/experiences/${experience.url}`}
                  title={experience.title}
                  image={
                    experience.experienceImages
                      ? experience.experienceImages
                      : ""
                  }
                  imgWidth={700}
                  imgHeight={512}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
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