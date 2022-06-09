import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import {
  GET_ALL_ARTIFACTS,
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_EXPERIENCE_BY_SLUG,
  GET_ARTIFACT_BY_SLUG,
} from "apollo/api";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SectionLink from "components/SectionLink";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import SocialForm from "components/SocialForm";
import CommentCard from "components/CommentCard";
import Section from "components/Section";
import AudioPlayer from "components/AudioPlayer";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";

export default function Artifact({
  artifact,
  experience,
  comments,
  relatedArtifacts,
}) {
  const { query } = useRouter();
  if (!artifact || !experience) return <PageLoading />;

  // Hide any content sections that have empty data
  const hasFilteredComments = comments.length > 0;
  const hasSimilarArtifacts = relatedArtifacts.length > 0;
  const hasDescription =
    artifact.description && artifact.description.document.length > 0;
  const hasAudioFile = artifact.audioFile && artifact.audioFile.length > 0;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <section className="px-3 lg:px-0 md:mx-auto">
          <BackLink
            href={`/experiences/${experience.url}`}
            text={"Back to Experience"}
          />
          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            <h1>{artifact.title}</h1>
            <h2>{artifact.artist}</h2>
          </div>

          <div className="flex relative my-5">
            <Image
              src={
                artifact.artifactImages
                  ? artifact.artifactImages
                  : "/stock-museum-1.jpg"
              }
              width="1080"
              height="720"
              alt={artifact.title}
            />
          </div>

          {hasAudioFile && <AudioPlayer audioFile={artifact.audioFile} />}
        </section>

        {hasDescription && (
          <Section className="formatted-content">
            <DocumentRenderer document={artifact.description.document} />
          </Section>
        )}
        {hasSimilarArtifacts && (
          <Section>
            <SectionLink
              href={`/experiences/${experience.url}`}
              text={"Go To Experience"}
            />
            <hr />
            <div className="w-full mt-4">
              <div className="flex flex-wrap">
                {relatedArtifacts.map((artifact, index) => (
                  <div className="w-1/2 my-4 px-0.5" key={index}>
                    <Link
                      href={`/experiences/${experience.url}/${artifact.url}`}
                      passHref
                    >
                      <a>
                        <Image
                          src={
                            artifact.artifactImages
                              ? artifact.artifactImages
                              : "/stock-museum-1.jpg"
                          }
                          width="430"
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

        {query.social === "true" && (
          <Section title="Share Thoughts and Images">
            <SocialForm artifactURL={artifact.url} />
          </Section>
        )}

        {hasFilteredComments && (
          <Section title="See What the Community has Shared">
            <div className="py-6 grid md:grid-cols-2 gap-4">
              {filteredComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="mt-6 px-6 md:px-0">
              <SectionLink
                href={`/community`}
                text={"Discover the Community"}
              />
            </div>
          </Section>
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const experiences = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });
  const artifacts = await apolloClient.query({
    query: GET_ALL_ARTIFACTS,
  });

  const paths = experiences.data.experiences
    .map((experience) => {
      return artifacts.data.artifacts.map((artifact) => {
        return {
          params: {
            experience: experience.url,
            artifact: `${experience.url}/${artifact.url}`,
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

  const artifact = await apolloClient.query({
    query: GET_ARTIFACT_BY_SLUG,
    variables: { url: params.artifact },
  });
  const experience = await apolloClient.query({
    query: GET_EXPERIENCE_BY_SLUG,
    variables: { url: params.experience },
  });
  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
  });

  if (
    !artifact ||
    !experience ||
    (artifact.data &&
      artifact.data.artifact &&
      artifact.data.artifact.status !== "published")
  ) {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      artifact: artifact.data.artifact,
      experience: experience.data.experience,
      comments: comments.data.comments.filter((comment) => comment.image) || [],
      relatedArtifacts: experience.data.experience.relatedArtifacts.filter(
        (item) => item.url !== artifact.data.artifact.url
      ),
    },
    revalidate: 1,
  });
}
