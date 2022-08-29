import { DocumentRenderer } from "@keystone-6/document-renderer";
import {
  GET_ALL_COMMENTS,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_LOGO,
} from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import BackLink from "components/BackLink";
import CommentCard from "components/CommentCard";
import Footer from "components/Footer";
import Header from "components/Header";
import PageLoading from "components/PageLoading";
import RelatedItemsGrid from "components/RelatedItemsGrid";
import Section from "components/Section";
import SectionLink from "components/SectionLink";
import SocialForm from "components/SocialForm";
import { format } from "date-fns";
import Head from "next/head";
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
    setFormattedStartDate(new Date(experience.startDate));
    setFormattedEndDate(new Date(experience.endDate));
  }, []);

  if ((router && router.isFallback) || !experience || !experiences)
    return <PageLoading siteId={query.site} />;

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>{experience.title}</title>
      </Head>
      <Header siteId={query.site} logo={logo} />
      <div className="flex-grow w-full max-w-4xl mx-auto">
        <Section>
          <BackLink
            href={`/${query.site}/experiences`}
            text={"Pick Experience"}
          />

          <div className="section-title space-y-1 mt-6 mb-6 md:mt-20">
            <h1 className="experience-title">{experience.title}</h1>

            <h3>
              {experience.startDate &&
                formattedStartDate &&
                format(formattedStartDate, "MMMM dd, yyyy")}
              {experience.endDate &&
                formattedEndDate &&
                ` - ${format(formattedEndDate, "MMM dd, yyyy")}`}
            </h3>
          </div>

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
  const siteContents = await apolloClient.query({
    query: GET_SITE_LOGO,
    variables: { siteId: params.site },
  });
  const logo = siteContents.data.siteContents[1];
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
