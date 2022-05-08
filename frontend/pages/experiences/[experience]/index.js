import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import { GET_ALL_EXPERIENCES, GET_EXPERIENCE_BY_SLUG } from "apollo/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import client from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import SocialForm from "components/SocialForm";
import Section from "components/Section";

export default function Experience({ experience, experiences }) {
  if (!experience || !experiences) return <PageLoading />;
  const similarExperiences = experiences.filter(
    (similarExperience) => similarExperience.slug !== experience.slug
  );
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <section className="px-6 lg:px-0 mt-4 md:mx-auto">
          <BackLink href={"/experiences"} text={"Pick Experience"} />
          <h1 className="experience-title">{experience.title}</h1>
          <span className="date-tag">
            {format(new Date(experience.startDate), "MMMM dd, yyyy")}
            {experience.endDate &&
              ` - ${format(new Date(experience.endDate), "MMM dd, yyyy")}`}
          </span>

          <p className="mt-6">{experience.description}</p>
        </section>

        {experience.artworks.length > 0 && (
          <Section title="Exhibition Preview">
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
          </Section>
        )}
        {similarExperiences.length > 0 && (
          <Section title="Similar Experiences">
            <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
              {similarExperiences.map((item, index) => (
                <div className="snap-center shrink-0 w-full my-3" key={index}>
                  <div className="shrink-0 flex flex-col">
                    <Link href={`/experiences/${item.slug}`} passHref>
                      <a>
                        <Image
                          src={
                            item.poster
                              ? item.poster.publicUrl
                              : "/stock-museum-1.jpg"
                          }
                          width={1080}
                          height={720}
                        />
                        <strong>{item.title}</strong>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <SectionLink
              href={`/experiences?viewAll=true`}
              text={"See all experiences"}
            />
          </Section>
        )}

        <Section title="Share Thoughts and Images">
          <SocialForm relatedExperienceId={experience.id} />
        </Section>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
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
