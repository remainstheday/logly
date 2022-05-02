import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import { format } from "date-fns";
import {
  GET_ALL_ARTWORKS,
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_ARTWORK_BY_SLUG,
  GET_EXPERIENCE_BY_SLUG,
} from "lib/api";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ArtworkCarousel from "components/ArtworkCarousel";
import SectionLink from "components/SectionLink";
import client from "lib/apollo-client";
import PageLoading from "components/PageLoading";
import ClientOnly from "utils/ClientOnly";
import SocialForm from "components/SocialForm";
import CommentCarousel from "components/Carousel";

export default function Artwork({ artwork, experience, comments }) {
  if (!artwork || !experience) return <PageLoading />;
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen mx-1 md:mx-auto">
        <BackLink href={"/experiences?viewAll=true"} text={"Pick Experience"} />

        <section className="container mt-20 md:mt-32 mx-auto">
          <div className="section-title my-6 space-y-2">
            <h1>{artwork.title}</h1>
            <h2>{artwork.artist}</h2>
            <h3>
              {format(new Date(artwork.startDate), "MMMM dd, yyyy")}
              {artwork.endDate &&
                ` - ${format(new Date(artwork.endDate), "MMM dd, yyyy")}`}
            </h3>
          </div>

          <div className="flex relative my-16">
            <Image
              src={
                artwork.images
                  ? artwork.images.publicUrl
                  : "/stock-museum-1.jpg"
              }
              width="1080"
              height="720"
            />
          </div>
        </section>

        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">Overview</h3>
          <hr />
          <p className="mt-6">{artwork.description}</p>
        </section>
        <section className="container mt-20 md:mt-32 mx-auto">
          <Link href={`/experiences/`}>
            <a>
              <h3 className="pb-3 section-title">Go To Experience</h3>
            </a>
          </Link>
          <hr />
          <div className="w-full mt-4">
            <div className="flex flex-wrap">
              {experience.artworks.map((artwork, index) => (
                <div className="w-1/2 my-4" key={index}>
                  <Link
                    href={`/experiences/${experience.slug}/${artwork.slug}`}
                    passHref
                  >
                    <a>
                      <Image
                        src={
                          artwork.images
                            ? artwork.images.publicUrl
                            : "/stock-museum-1.jpg"
                        }
                        width="430"
                        height="281"
                        className="w-full px-1"
                      />
                      <h3 className="font-bold">{artwork.artist}</h3>
                      <h4>{artwork.title}</h4>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">Share Thoughts and Images</h3>
          <hr />
          <ClientOnly>
            <SocialForm relatedArtworkId={artwork.id} />
          </ClientOnly>
        </section>

        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">
            See What the Community has Shared
          </h3>
          <hr />
          <br />
          <CommentCarousel comments={comments} />
          <br />
          <SectionLink href={`/social`} text={"Discover Art Social"} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const experiences = await client.query({
    query: GET_ALL_EXPERIENCES,
  });
  const artworks = await client.query({
    query: GET_ALL_ARTWORKS,
  });

  const paths = experiences.data.experiences
    .map((experience) => {
      return artworks.data.artworks.map((artwork) => {
        return {
          params: {
            experience: experience.slug,
            artwork: `${experience.slug}/${artwork.slug}`,
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
  let artwork = null;
  let experience = null;
  let comments = null;
  try {
    artwork = await client.query({
      query: GET_ARTWORK_BY_SLUG,
      variables: { slug: `${params.artwork}` },
    });
    experience = await client.query({
      query: GET_EXPERIENCE_BY_SLUG,
      variables: { slug: `${params.experience}` },
    });
    comments = await client.query({
      query: GET_ALL_COMMENTS,
    });
  } catch (e) {
    return e;
  }

  if (!artwork || !experience) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      artwork: artwork.data.artwork,
      experience: experience.data.experience,
      comments: comments.data.comments,
    },
    revalidate: 10,
  };
}
