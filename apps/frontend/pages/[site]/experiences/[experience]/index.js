import { DocumentRenderer } from "@keystone-6/document-renderer";
import {
  GET_ALL_COMMENTS,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_CONTENT,
} from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import AudioPlayer from "components/AudioPlayer";
import BackLink from "components/BackLink";
import CommentCard from "components/CommentCard";
import Footer from "components/Footer";
import Header from "components/Header";
import PageLoading from "components/PageLoading";
import PosterImage from "components/PosterImage";
import RelatedItemsGrid from "components/RelatedItemsGrid";
import Section from "components/Section";
import SectionLink from "components/SectionLink";
import SocialForm from "components/SocialForm";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Experience({
  logo,
  experience,
  experiences,
  artifacts,
  comments,
}) {
  const { query, router } = useRouter();
  const [formattedStartDate, setFormattedStartDate] = useState(null);
  const [formattedEndDate, setFormattedEndDate] = useState(null);

  useEffect(() => {
    setFormattedStartDate(new Date(experience.experienceStart));
    setFormattedEndDate(new Date(experience.experienceEnd));
  }, [experience.experienceStart, experience.experienceEnd]);

  if ((router && router.isFallback) || !experience || !experiences)
    return <PageLoading siteId={query.site} />;
  const metaTitle = `${query.site
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")} - ${experience.title}`;

  const hasAudioFile = experience.audioFile && experience.audioFile.length > 0;

  return (
    <div className="flex flex-col h-screen">
      <Header siteId={query.site} logo={logo} title={metaTitle} />
      <div className="flex-grow w-full max-w-4xl mx-auto">
        <Section>
          <BackLink
            href={`/${query.site}/experiences`}
            text={"Pick Experience"}
          />

          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            {experience.experienceImages && (
              <PosterImage
                image={experience.experienceImages}
                title={experience.title}
                altText={experience.altText}
              />
            )}
            <h1 className="experience-title">{experience.title}</h1>

            <h3>
              {experience.experienceStart &&
                formattedStartDate &&
                format(formattedStartDate, "MMMM dd, yyyy")}
              {experience.experienceEnd &&
                formattedEndDate &&
                ` - ${format(formattedEndDate, "MMMM dd, yyyy")}`}
            </h3>
          </div>

          {hasAudioFile && (
            <div className="my-6">
              <AudioPlayer audioFile={experience.audioFile} />
            </div>
          )}

          {experience.description && (
            <div className="wysiwyg-editor prose">
              <DocumentRenderer document={experience.description.document} />
            </div>
          )}
        </Section>

        {artifacts && artifacts.length > 0 && (
          <Section title="Exhibition Preview">
            <div className="w-full mt-4">
              <RelatedItemsGrid items={artifacts} />
            </div>
          </Section>
        )}
        {experiences.length > 0 && (
          <Section title="Similar Experiences">
            <div className="w-full mt-4">
              <RelatedItemsGrid items={experiences} />
            </div>
            <SectionLink
              href={`/${query.site}/experiences?viewAll=true`}
              text={"See all experiences"}
            />
          </Section>
        )}

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
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();
  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });
  const logo = content.data.siteContents.find((item) => item.name === "Home");
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

  if (!experience || experience.status !== "published") {
    return {
      notFound: true,
    };
  }

  const filteredComments = comments.data.comments.filter(
    (comment) => comment.query.experience === params.experience
  );

  const relatedArtifacts = experience.relatedArtifacts
    .map((artifact) => ({
      ...artifact,
      url: `${experience.url}/${artifact.url}`,
      image: artifact.artifactImages,
    }))
    .filter((item) => item.status === "published");

  const filteredExperiences = experiences.data.experiences
    .map((filteredExperience) => ({
      ...filteredExperience,
      url: filteredExperience.url,
      image: filteredExperience.experienceImages,
    }))
    .filter(
      (item) => item.status === "published" && item.url !== experience.url
    );

  return addApolloState(apolloClient, {
    props: {
      experience,
      logo,
      experiences: filteredExperiences,
      artifacts: relatedArtifacts,
      comments: filteredComments,
    },
  });
}
