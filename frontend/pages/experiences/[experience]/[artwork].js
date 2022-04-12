import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import { format } from "date-fns";
import { Field, Formik } from "formik";
import {
  GET_ALL_ARTWORKS,
  GET_ALL_EXPERIENCES, GET_ARTWORK_BY_SLUG, GET_EXPERIENCE_BY_SLUG,
} from "lib/api";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import ArtworkCarousel from "components/ArtworkCarousel";
import SectionLink from "components/SectionLink";
import client from "lib/apollo-client";

export default function Artwork({ artwork, experience }) {
  if (!artwork) return <>loading...</>;
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
          <ArtworkCarousel items={[artwork]} />
          <Image
            src={
              artwork.images ? artwork.images.publicUrl : "/stock-museum-1.jpg"
            }
            width="1080"
            height="720"
          />

          <figure className="my-6">
            <audio controls src="/media/cc0-audio/t-rex-roar.mp3">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
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
          <Formik
            initialValues={{ name: "", comments: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ values }) => (
              <form className="social-form">
                <input
                  className="w-full"
                  type="text"
                  name="name"
                  value={values.email}
                  placeholder="Name"
                />
                <Field
                  className="w-full"
                  as="textarea"
                  name="comments"
                  rows="5"
                  placeholder="write a comment"
                />
                <button type="submit" className="w-full">
                  Share
                </button>
              </form>
            )}
          </Formik>
        </section>

        <section className="container mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">
            See What the Community has Shared
          </h3>
          <hr />
          <br />
          <div className="flex w-full">
            <Image src={`/stock-museum-1.jpg`} width="1080" height="720" />
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
            </div>
          </div>
          <br />
          <SectionLink href={`/social`} text={"Discover Art Social"} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  // const experiences = await getAllExperiences();
  const experiences = await client.query({
    query: GET_ALL_EXPERIENCES
  })
  // const artworks = await getAllArtworks();

  const artworks = await client.query({
    query: GET_ALL_ARTWORKS
  })



  const paths = experiences.data
    .map((experience) => {
      return artworks.data.map((artwork) => {
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
  const artwork = await client.query({
    query: GET_ARTWORK_BY_SLUG,
    variables: {slug: `${params.artwork}`}
  })

  const experience = await client.query({
    query: GET_EXPERIENCE_BY_SLUG,
    variables: {slug: `${params.experience}`}
  })

  return {
    props: { artwork: artwork.data, experience: experience.data },
    revalidate: 1,
  };
}
