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
import Link from "next/link";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";
import Banner from "components/Banner";

export default function IndexPage({ content, experiences, comments }) {
  const { query, router } = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if ((router && router.isFallback) || !content || !experiences || !comments)
    return <PageLoading />;

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
          {content.title && (
            <PageTitle smallText={"welcome to"} largeText={content.title} />
          )}
          {content.staticPageImages && (
            <Banner image={content.staticPageImages} title={content.title} />
          )}
          {content.description && (
            <div className="my-8 wysiwyg-editor">
              <DocumentRenderer document={content.description.document} />
            </div>
          )}
        </Section>

        {experiences.length > 0 && (
          <Section title="Pick an Experience">
            <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
              {experiences.map((item, index) => (
                <div className="snap-center shrink-0 w-full my-3" key={index}>
                  <div className="shrink-0 flex flex-col">
                    <Link href={item.url} passHref>
                      <a className="aspect-w-16 aspect-h-9">
                        <img
                          src={
                            item.experienceImages
                              ? item.experienceImages
                              : "/stock-museum-1.jpg"
                          }
                          alt={item.title}
                        />
                      </a>
                    </Link>
                    <Link href={item.url} passHref>
                      <a>
                        <strong>{item.title}</strong>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
