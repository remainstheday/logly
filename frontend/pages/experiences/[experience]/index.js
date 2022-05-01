import BackLink from "components/BackLink";
import ContentSlider from "components/ContentSlider";
import Footer from "components/Footer";
import Header from "components/Header";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import { GET_ALL_EXPERIENCES, GET_EXPERIENCE_BY_SLUG } from "lib/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import client from "lib/apollo-client";
import PageLoading from "components/PageLoading";

export default function Experience({ experience, experiences }) {
  if (!experience || !experiences) return <PageLoading />;
  const similarExperiences = experiences.filter(
    (similarExperience) => similarExperience.slug !== experience.slug
  );
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <section className="mx-6 mt-4 md:mx-auto">
          <BackLink
            href={"/experiences?viewAll=true"}
            text={"Pick Experience"}
          />
          <h1 className="experience-title">{experience.title}</h1>
          <span className="date-tag">
            {format(new Date(experience.startDate), "MMMM dd, yyyy")}
            {experience.endDate &&
              ` - ${format(new Date(experience.endDate), "MMM dd, yyyy")}`}
          </span>

          <p className="mt-6">{experience.description}</p>
        </section>

        <section className="mx-6 mt-4 md:mx-auto">
          <h3 className="pb-3 section-title">Exhibition Preview</h3>
          <hr />

          <div className="w-full mt-4">
            <div className="grid grid-cols-2 gap-4">
              {experience.artworks.map((artwork, index) => (
                <div className="my-4" key={index}>
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
                        width="436"
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
        <section className="mx-6 mt-4 md:mx-auto">
          <h3 className="pb-3 section-title">Similar Experiences</h3>
          <hr />
          <div className="w-full mt-4">
            <ContentSlider
              items={similarExperiences}
              contentType="experience"
            />
            <SectionLink
              href={`/experiences?viewAll=true`}
              text={"See all experiences"}
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  // const experiences = await getAllExperiences();
  const experiences = await client.query({
    query: GET_ALL_EXPERIENCES,
  });
  const paths =
    experiences.data.experiences.map((item) => ({
      params: { experience: item.slug },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const experience = await client.query({
    query: GET_EXPERIENCE_BY_SLUG,
    variables: { slug: `${params.experience}` },
  });

  const experiences = await client.query({
    query: GET_ALL_EXPERIENCES,
  });

  return {
    props: {
      experience: experience.data.experience,
      experiences: experiences.data.experiences,
    },
    revalidate: 1,
  };
}
