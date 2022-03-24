import ArtworkCard from "components/ArtworkCard";
import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import { format } from "date-fns";
import { Field, Formik } from "formik";
import { getAllArtworks, getAllExperiences, getArtworkBySlug } from "lib/api";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Artwork({ artwork }) {
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
          <Link href="/">
            <a>
              <h3 className="pb-3 section-title">Go To Experience</h3>
            </a>
          </Link>
          <hr />
          <div className="w-full mt-4">
            <div className="flex">
              <div className="w-1/2">
                <Link href={`/experiences`} passHref>
                  <a>
                    <Image
                      src={
                        artwork.images
                          ? artwork.images.publicUrl
                          : "/stock-museum-1.jpg"
                      }
                      width="1080"
                      height="720"
                      className="px-1"
                    />
                    <h3>{artwork.title}</h3>
                  </a>
                </Link>
              </div>
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
            {({ values, errors, isSubmitting, handleSubmit }) => (
              <form className="social-form">
                <input
                  className="w-full md:w-1/2"
                  type="text"
                  name="name"
                  value={values.email}
                  placeholder="Name"
                />
                <Field
                  className="w-full md:w-1/2"
                  as="textarea"
                  name="comments"
                  rows="5"
                  placeholder="write a comment"
                />
                <button type="submit" className="w-full md:w-1/2">
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
          <ArtworkCard img={artwork.images ? artwork.images.publicUrl : ""} />
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const experiences = await getAllExperiences();
  const artworks = await getAllArtworks();

  const paths = experiences
    .map((experience) => {
      return artworks.map((artwork) => {
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
  const artwork = await getArtworkBySlug(`${params.artwork}`);
  return {
    props: { artwork },
    revalidate: 1,
  };
}
