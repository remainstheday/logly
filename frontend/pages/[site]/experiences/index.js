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
import Link from "next/link";

export default function Experience({ experiences, logo }) {
  const { query } = useRouter();
  if (!experiences) return <PageLoading />;
  return (
    <>
      <Header siteId={query.site} logo={logo} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle smallText={"Pick Your"} largeText={"Experience"} />

          <div className="mt-6 grid grid-cols-2 gap-4">
            {experiences.map((item, index) => (
              <div className="snap-center shrink-0 w-full my-3" key={index}>
                <div className="shrink-0 flex flex-col">
                  <Link href={item.url} passHref>
                    <a className="aspect-w-16 aspect-h-9">
                      <img
                        src={
                          item.experienceImages
                            ? item.experienceImages
                            : "/stock-museum-1.jpg"
                        }
                        alt={item.title}
                      />
                    </a>
                  </Link>
                  <Link href={item.url} passHref>
                    <a>
                      <strong>{item.title}</strong>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
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
  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });

  return addApolloState(apolloClient, {
    props: {
      logo: siteContents.data.siteContents[1],
      experiences: experiences.data.experiences.filter(
        (experience) => experience.status === "published"
      ),
    },
  });
}
