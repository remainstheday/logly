import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import {
  GET_ALL_ARTWORKS,
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_ARTWORK_BY_SLUG,
  GET_EXPERIENCE_BY_SLUG,
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

export default function Artwork({ artwork, experience, comments }) {
  const { query } = useRouter();
  if (!artwork || !experience) return <PageLoading />;

  // don't show the current artwork as recommended artworks
  const similarArtworks = experience.relatedArtworks.filter(
    (item) => item.url !== artwork.url
  );

  // only show comments with images in them
  const filteredComments = comments.filter((comment) => comment.image);

  // Hide any content sections that have empty data
  const hasFilteredComments = filteredComments.length > 0;
  const hasSimilarArtworks = similarArtworks.length > 0;
  const hasDescription =
    artwork.description && artwork.description.document.length > 0;
  const hasAudioFile = artwork.audioFile && artwork.audioFile.length > 0;

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
            <h1>{artwork.title}</h1>
            <h2>{artwork.artist}</h2>
          </div>

          <div className="flex relative my-5">
            <Image
              src={
                artwork.artworkImages
                  ? artwork.artworkImages
                  : "/stock-museum-1.jpg"
              }
              width="1080"
              height="720"
              alt={artwork.title}
            />
          </div>

          {hasAudioFile && <AudioPlayer audioFile={artwork.audioFile} />}
        </section>

        {hasDescription && (
          <Section className="formatted-content">
            <DocumentRenderer document={artwork.description.document} />
          </Section>
        )}
        {hasSimilarArtworks && (
          <Section>
            <SectionLink
              href={`/experiences/${experience.url}`}
              text={"Go To Experience"}
            />
            <hr />
            <div className="w-full mt-4">
              <div className="flex flex-wrap">
                {similarArtworks.map((artwork, index) => (
                  <div className="w-1/2 my-4" key={index}>
                    <Link
                      href={`/experiences/${experience.url}/${artwork.url}`}
                      passHref
                    >
                      <a>
                        <Image
                          src={
                            artwork.artworkImages
                              ? artwork.artworkImages
                              : "/stock-museum-1.jpg"
                          }
                          width="430"
                          height="281"
                          className="w-full px-1"
                          alt={artwork.title}
                        />
                        <h3 className="font-bold">{artwork.artist}</h3>
                        <h4>{artwork.title}</h4>
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
            <SocialForm artworkURL={artwork.url} />
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
  const artworks = await apolloClient.query({
    query: GET_ALL_ARTWORKS,
  });

  const paths = experiences.data.experiences
    .map((experience) => {
      return artworks.data.artworks.map((artwork) => {
        return {
          params: {
            experience: experience.url,
            artwork: `${experience.url}/${artwork.url}`,
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

  const artwork = await apolloClient.query({
    query: GET_ARTWORK_BY_SLUG,
    variables: { url: params.artwork },
  });
  const experience = await apolloClient.query({
    query: GET_EXPERIENCE_BY_SLUG,
    variables: { url: params.experience },
  });
  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
  });

  if (!artwork || !experience) {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      artwork: artwork.data.artwork,
      experience: experience.data.experience,
      comments: comments.data.comments,
    },
    revalidate: 1,
  });
}
