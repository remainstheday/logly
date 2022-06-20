import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import {
  GET_ALL_COMMENTS,
  GET_ALL_SITES,
  GET_EXPERIENCES_BY_SITE_ID,
  GET_SITE_CONTENT,
} from "apollo/api";
import Image from "next/image";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import CommentCard from "components/CommentCard";
import React from "react";
import Link from "next/link";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { useRouter } from "next/router";

export default function IndexPage({ content, experiences, comments }) {
  const { query } = useRouter();
  if (!content || !experiences || !comments) return <PageLoading />;
  const filteredComments = comments.filter((comment) => comment.image);

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <main>
          {content.title && (
            <PageTitle smallText={"welcome to"} largeText={content.title} />
          )}

          {content.staticPageImages && (
            <div className="flex relative my-16">
              <Image
                src={content.staticPageImages}
                width="1080"
                height="720"
                alt={content.title}
              />
            </div>
          )}

          {content.description && (
            <Section className="wysiwyg-editor">
              <DocumentRenderer document={content.description.document} />
            </Section>
          )}

          {experiences.length > 0 && (
            <Section title="Pick an Experience">
              <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
                {experiences.map((item, index) => (
                  <div className="snap-center shrink-0 w-full my-3" key={index}>
                    <div className="shrink-0 flex flex-col">
                      <Link
                        href={`/${query.site}/experiences/${item.url}`}
                        passHref
                      >
                        <a>
                          <Image
                            src={
                              item.experienceImages
                                ? item.experienceImages
                                : "/stock-museum-1.jpg"
                            }
                            width={1080}
                            height={720}
                            alt={item.title}
                          />
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

          {filteredComments.length > 0 && (
            <Section title="Community">
              <div className="py-6 grid md:grid-cols-2 gap-4">
                {filteredComments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
              <div className="mt-6 px-6 md:px-0">
                <SectionLink href={`/community`} text={"Discover Community"} />
              </div>
            </Section>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_ALL_SITES,
  });

  const paths =
    data.sites.map((item) => ({
      params: { site: item.url },
    })) || [];

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
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
        (experience) =>
          experience.status === "published" &&
          experience.experienceImages.length > 0
      ),
      comments: comments.data.comments,
    },
    revalidate: 1,
  });
}
