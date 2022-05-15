import BackLink from "components/BackLink";
import Footer from "components/Footer";
import Header from "components/Header";
import SectionLink from "components/SectionLink";
import { format } from "date-fns";
import {
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_EXPERIENCE_BY_SLUG,
} from "apollo/api";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import SocialForm from "components/SocialForm";
import Section from "components/Section";
import CommentCard from "components/CommentCard";

export default function Experience({ experience, experiences, comments }) {
  if (!experience || !experiences) return <PageLoading />;
  const filteredComments = comments.filter((comment) => comment.image);
  const similarExperiences = experiences.filter(
    (similarExperience) => similarExperience.slug !== experience.slug
  );
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <section className="px-3 lg:px-0 md:mx-auto">
          <BackLink href={"/experiences"} text={"Pick Experience"} />

          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            <h1 className="experience-title">{experience.title}</h1>
            <h3>
              {format(new Date(experience.startDate), "MMMM dd, yyyy")}
              {experience.endDate &&
                ` - ${format(new Date(experience.endDate), "MMM dd, yyyy")}`}
            </h3>
          </div>

          <p className="mt-6">{experience.description}</p>
        </section>

        {experience.artworks.length > 0 && (
          <Section title="Exhibition Preview">
            <div className="w-full mt-4">
              <div className="grid grid-cols-2 gap-4">
                {experience.artworks.map((artwork) => (
                  <div className="my-4" key={artwork.id}>
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

        {filteredComments.length > 0 && (
          <Section title="See What the Community has Shared">
            <div className="py-6 grid md:grid-cols-2 gap-4">
              {filteredComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
            <div className="mt-6 px-6 md:px-0">
              <SectionLink href={`/social`} text={"Discover Art Social"} />
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
  const { data } = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });
  const paths =
    data.experiences.map((item) => ({
      params: { experience: item.slug },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const experience = await apolloClient.query({
    query: GET_EXPERIENCE_BY_SLUG,
    variables: { slug: `${params.experience}` },
  });
  const experiences = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });

  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
  });

  return addApolloState(apolloClient, {
    props: {
      experience: experience.data.experience,
      experiences: experiences.data.experiences,
      comments: comments.data.comments,
    },
    revalidate: 1,
  });
}
