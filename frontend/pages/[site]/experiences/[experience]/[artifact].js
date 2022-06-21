import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import {
  GET_ALL_ARTIFACTS,
  GET_ALL_COMMENTS,
  GET_ALL_SITES,
  GET_ALL_EXPERIENCES,
  GET_ARTIFACTS_BY_SITE_ID,
  GET_EXPERIENCES_BY_SITE_ID,
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

  const similarArtifacts = relatedArtifacts.filter(
    (item) => item.url !== artifact.url
  );

  const filteredComments = comments.filter(
    (comment) => comment.image && comment.artifactURL === artifact.url
  );

  const hasDescription =
    artifact.description && artifact.description.document.length > 0;
  const hasAudioFile = artifact.audioFile && artifact.audioFile.length > 0;

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <section className="px-3 lg:px-0 md:mx-auto">
          <BackLink href={`${experience.url}`} text={"Back to Experience"} />
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
          <Section className="formatted-content wysiwyg-editor">
            <DocumentRenderer document={artifact.description.document} />
          </Section>
        )}
        {similarArtifacts.length > 0 && (
          <Section>
            <SectionLink href={`${experience.url}`} text={"Go To Experience"} />
            <hr />
            <div className="w-full mt-4">
              <div className="flex flex-wrap">
                {similarArtifacts.map((artifact, index) => (
                  <div className="w-1/2 my-4 px-0.5" key={index}>
                    <Link href={`${experience.url}/${artifact.url}`} passHref>
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
            <SocialForm artifactURL={artifact.url} siteId={query.site} />
          </Section>
        )}

        {filteredComments.length > 0 && (
          <Section title="See What the Community has Shared">
            <div className="py-6 grid md:grid-cols-2 gap-4">
              {filteredComments.map((comment) => (
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
      <Footer />
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
  const artifacts = await apolloClient.query({
    query: GET_ALL_ARTIFACTS,
  });

  const paths = sites.data.sites
    .map((site) =>
      experiences.data.experiences
        .map((experience) =>
          artifacts.data.artifacts.map((artifact) => ({
            params: {
              site: site.url,
              experience: experience.url,
              artifact: `${experience.url}/${artifact.url}`,
            },
          }))
        )
        .flat()
    )
    .flat();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const artifacts = await apolloClient.query({
    query: GET_ARTIFACTS_BY_SITE_ID,
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
  const artifact = artifacts.data.artifacts.filter(
    (item) => item.url === params.artifact
  )[0];

  if (!artifact || !experience || artifact.status !== "published") {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      artifact,
      experience,
      comments: comments.data.comments,
      relatedArtifacts: experience.relatedArtifacts,
    },
    revalidate: 1,
  });
}
