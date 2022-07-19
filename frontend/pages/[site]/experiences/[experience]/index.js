import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import {
  GET_ALL_EXPERIENCES,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_LOGO,
} from "apollo/api";
import Link from "next/link";
import React from "react";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import SocialForm from "components/SocialForm";
import Section from "components/Section";
import CommentCard from "components/CommentCard";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";

export default function Experience({
  logo,
  experience,
  experiences,
  artifacts,
  comments,
}) {
  const { query, router } = useRouter();
  if ((router && router.isFallback) || !experience || !experiences)
    return <PageLoading />;
  const similarExperiences = experiences.filter(
    (similarExperience) => similarExperience.url !== experience.url
  );

  return (
    <>
      <Header siteId={query.site} logo={logo} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <BackLink
            href={`/${query.site}/experiences`}
            text={"Pick Experience"}
          />

          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            <h1 className="experience-title">{experience.title}</h1>
            <h3>
              {format(new Date(experience.startDate), "MMMM dd, yyyy")}
              {experience.endDate &&
                ` - ${format(new Date(experience.endDate), "MMM dd, yyyy")}`}
            </h3>
          </div>

          {experience.description && (
            <div className="wysiwyg-editor prose">
              <DocumentRenderer document={experience.description.document} />
            </div>
          )}
        </Section>

        {artifacts && artifacts.length > 0 && (
          <Section title="Exhibition Preview">
            <div className="w-full mt-4">
              <div className="grid grid-cols-2 gap-4">
                {artifacts.map((artifact, index) => (
                  <div className="snap-center shrink-0 w-full my-3" key={index}>
                    <div className="shrink-0 flex flex-col">
                      <Link href={`${experience.url}/${artifact.url}`} passHref>
                        <a className="aspect-w-16 aspect-h-9">
                          <img
                            src={
                              artifact.artifactImages
                                ? artifact.artifactImages
                                : "/stock-museum-1.jpg"
                            }
                            alt={artifact.title}
                          />
                        </a>
                      </Link>
                      <Link href={`${experience.url}/${artifact.url}`} passHref>
                        <a>
                          <strong>{artifact.title}</strong>
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}
        {similarExperiences.length > 0 && (
          <Section title="Similar Experiences">
            <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
              {similarExperiences.map((item, index) => (
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
            <SectionLink
              href={`/${query.site}/experiences?viewAll=true`}
              text={"See all experiences"}
            />
          </Section>
        )}

        {query.social === "true" && (
          <Section title="Share Thoughts and Images">
            <SocialForm
              experienceTitle={experience.title}
              experienceURL={experience.url}
              siteId={query.site}
            />
          </Section>
        )}

        {comments.length > 0 && (
          <Section title="See What the Community has Shared">
            <div className="py-6 grid md:grid-cols-2 gap-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="mt-6 px-6 md:px-0">
              <SectionLink
                href={`${query.site}/community`}
                text={"Discover the Community"}
              />
            </div>
          </Section>
        )}
      </div>
      <Footer siteId={query.site} />
    </>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const experiences = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });

  let paths = [];

  experiences.data.experiences.map((experience) => {
    return paths.push({
      params: {
        site: experience.siteId,
        experience: experience.url,
      },
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const siteContents = await apolloClient.query({
    query: GET_SITE_LOGO,
    variables: { siteId: params.site },
  });
  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });

  const experience = experiences.data.experiences.filter(
    (experience) =>
      experience.url === `/${params.site}/experiences/${params.experience}`
  )[0];

  if (!experience || experience.status !== "published") {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      experience,
      logo: siteContents.data.siteContents[1],
      experiences: experiences.data.experiences.filter(
        (experience) => experience.status === "published"
      ),
      artifacts: experience.relatedArtifacts.filter(
        (artifact) => artifact.status === "published"
      ),
      comments: [],
    },
    revalidate: 1,
  });
}
