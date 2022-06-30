import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import {
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_ALL_SITES,
  GET_EXPERIENCES_BY_SITE_ID,
} from "apollo/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import SocialForm from "components/SocialForm";
import Section from "components/Section";
import CommentCard from "components/CommentCard";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";

const customLoader = ({ src }) => {
  return src;
};

export default function Experience({ experience, experiences, comments }) {
  const { query } = useRouter();
  if (!experience || !experiences) return <PageLoading />;
  const similarExperiences = experiences.filter(
    (similarExperience) => similarExperience.url !== experience.url
  );

  return (
    <>
      <Header siteId={query.site} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <section className="px-3 lg:px-0 md:mx-auto">
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
            <Section className="wysiwyg-editor prose">
              <DocumentRenderer document={experience.description.document} />
            </Section>
          )}
        </section>

        {experience.relatedArtifacts && experience.relatedArtifacts.length > 0 && (
          <Section title="Exhibition Preview">
            <div className="w-full mt-4">
              <div className="grid grid-cols-2 gap-4">
                {experience.relatedArtifacts.map((artifact, index) => (
                  <div className="my-4" key={index}>
                    <Link href={`${experience.url}/${artifact.url}`} passHref>
                      <a>
                        <Image
                          loader={customLoader}
                          src={
                            artifact.artifactImages
                              ? artifact.artifactImages
                              : "/stock-museum-1.jpg"
                          }
                          width="436"
                          height="281"
                          className="w-full px-1"
                          alt={artifact.title}
                        />
                        <h3 className="font-bold">{artifact.artist}</h3>
                        <h4>{artifact.title}</h4>
                      </a>
                    </Link>
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
                    <Link href={`${item.url}`} passHref>
                      <a>
                        <Image
                          loader={customLoader}
                          src={
                            item.experienceImages
                              ? item.experienceImages
                              : "/stock-museum-1.jpg"
                          }
                          width={1080}
                          height={720}
                          alt={item.title}
                        />
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
            <SocialForm experienceURL={experience.url} siteId={query.site} />
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
  const sites = await apolloClient.query({
    query: GET_ALL_SITES,
  });
  const experiences = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });

  const paths = sites.data.sites
    .map((site) => {
      return experiences.data.experiences.map((experience) => {
        return {
          params: {
            site: site.url,
            experience: experience.url,
          },
        };
      });
    })
    .flat();

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

  const experience = experiences.data.experiences.filter(
    (experience) =>
      experience.url === `/${params.site}/experiences/${params.experience}`
  )[0];

  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });

  if (!experience || experience.status !== "published") {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      experience,
      experiences: experiences.data.experiences.filter(
        (experience) => experience.status === "published"
      ),

      comments: comments.data.comments.filter(
        (comment) => comment.image && comment.experienceURL === experience.url
      ),
    },
    revalidate: 1,
  });
}
