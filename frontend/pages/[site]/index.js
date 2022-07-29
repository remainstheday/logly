import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import {
  GET_ALL_COMMENTS,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_CONTENT,
} from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import CommentCard from "components/CommentCard";
import React from "react";
import Section from "components/Section";
import { useRouter } from "next/router";
import PosterImage from "components/PosterImage";
import DescriptionContent from "components/DescriptionContent";
import RelatedItemsGrid from "components/RelatedItemsGrid";

export default function IndexPage({ content, experiences, comments }) {
  const { query, router } = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if ((router && router.isFallback) || !content || !experiences || !comments)
    return <PageLoading siteId={query.site} />;

  return (
    <>
      <Header
        siteId={query.site}
        logo={{
          siteLogo: content.siteLogo,
          logoWidth: content.logoWidth,
          logoHeight: content.logoHeight,
        }}
      />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <PageTitle smallText={"welcome to"} largeText={content.title} />
          <PosterImage image={content.staticPageImages} title={content.title} />
          <DescriptionContent content={content.description.content} />
        </Section>

        {experiences.length > 0 && (
          <Section title="Pick an Experience">
            <RelatedItemsGrid items={experiences} />
            <SectionLink
              href={`/${query.site}/experiences`}
              text={"See all experiences"}
            />
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
                href={`${query.site}/community`}
                text={"Discover the Community"}
              />
            </div>
          </Section>
        )}
      </div>
      <Footer siteId={query.site} />
    </>
  );
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const experiences = await apolloClient.query({
    query: GET_EXPERIENCES_BY_SITE_ID,
    variables: { siteId: params.site },
  });

  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });

  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });

  return addApolloState(apolloClient, {
    props: {
      content: content.data.siteContents.find((item) => item.name === "Home"),
      experiences: experiences.data.experiences.filter(
        (experience) => experience.status === "published"
      ),
      comments: comments.data.comments,
    },
  });
}
