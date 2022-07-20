import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import {
  GET_ALL_COMMENTS,
  GET_ARTIFACTS,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_LOGO,
} from "apollo/api";
import Link from "next/link";
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
  logo,
  artifact,
  experience,
  comments,
  relatedArtifacts,
}) {
  const { query, router } = useRouter();
  if ((router && router.isFallback) || !artifact || !experience)
    return <PageLoading />;

  const similarArtifacts = relatedArtifacts.filter(
    (item) => item.url !== artifact.url
  );

  const hasDescription =
    artifact.description && artifact.description.document.length > 0;
  const hasAudioFile = artifact.audioFile && artifact.audioFile.length > 0;
  return (
    <>
      <Header siteId={query.site} logo={logo} />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <BackLink href={`${experience.url}`} text={"Back to Experience"} />
          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            <h1>{artifact.title}</h1>
            <h2>{artifact.artist}</h2>
          </div>

          <div className="mt-16 mb-8 aspect-w-16 aspect-h-9">
            <img
              src={
                artifact.artifactImages
                  ? artifact.artifactImages
                  : "/stock-museum-1.jpg"
              }
              alt={artifact.title}
            />
          </div>

          {hasAudioFile && (
            <div className="my-6">
              <AudioPlayer audioFile={artifact.audioFile} />
            </div>
          )}

          {hasDescription && (
            <div className="formatted-content wysiwyg-editor">
              <DocumentRenderer document={artifact.description.document} />
            </div>
          )}
          {similarArtifacts.length > 0 && (
            <Section title="Exhibition Preview">
              <div className="w-full mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {similarArtifacts.map((artifact, index) => (
                    <div
                      className="snap-center shrink-0 w-full my-3"
                      key={index}
                    >
                      <div className="shrink-0 flex flex-col">
                        <Link
                          href={`${experience.url}/${artifact.url}`}
                          passHref
                        >
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
                        <Link
                          href={`${experience.url}/${artifact.url}`}
                          passHref
                        >
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
        </Section>

        {query.social === "true" && (
          <Section title="Share Thoughts and Images">
            <SocialForm query={query} />
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
                href={`/${query.site}/community`}
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
  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });

  const experience = experiences.data.experiences.filter(
    (experience) =>
      experience.url === `/${params.site}/experiences/${params.experience}`
  )[0];
  const artifacts = await apolloClient.query({
    query: GET_ARTIFACTS,
    variables: { url: params.artifact },
  });
  const artifact = artifacts.data.artifacts.filter(
    (artifact) => artifact.siteId === params.site
  )[0];

  if (!artifact || !experience || artifact.status !== "published") {
    return {
      notFound: true,
    };
  }

  const filteredComments = comments.data.comments.filter(
    (comment) => comment.query.artifact === artifact.url
  );

  return addApolloState(apolloClient, {
    props: {
      logo: siteContents.data.siteContents[1],
      artifact,
      comments: filteredComments,
      experience,
      relatedArtifacts: experience.relatedArtifacts,
    },
  });
}
