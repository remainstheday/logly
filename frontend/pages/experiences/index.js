import { GET_ALL_EXPERIENCES } from "apollo/api";
import Header from "components/Header";
import Footer from "components/Footer";
import Thumbnail from "components/Thumbnail";
import BackLink from "components/BackLink";
import React from "react";
import PageTitle from "components/PageTitle";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";

export default function Experience({ experiences }) {
  if (!experiences) return <PageLoading />;
  console.log(experiences);
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
                  href={`/experiences/${experience.url}`}
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

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });

  console.log(data);
  return addApolloState(apolloClient, {
    props: {
      experiences: data.experiences.filter(
        (experience) => experience.status === "published"
      ),
    },
    revalidate: 1,
  });
}
