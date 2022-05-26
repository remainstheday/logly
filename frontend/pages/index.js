import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import {
  GET_ALL_ARTWORKS,
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_STATIC_CONTENTS,
} from "apollo/api";
import Image from "next/image";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import CommentCard from "components/CommentCard";
import React from "react";
import Link from "next/link";
import Section from "components/Section";
import { DocumentRenderer } from "@keystone-6/document-renderer";

export default function IndexPage({ content, experiences, comments }) {
  if (!content || !experiences) return <PageLoading />;
  const homepage = content[0];
  const filteredComments = comments.filter((comment) => comment.image);
  const renderDescription =
    homepage.description && homepage.description.document.length > 0;
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <main>
          {homepage.title && (
            <PageTitle smallText={"welcome to"} largeText={homepage.title} />
          )}

          {homepage.poster && (
            <div className="flex relative my-16">
              <Image
                src={homepage.poster.publicUrl}
                width="1080"
                height="720"
                alt={homepage.title}
              />
            </div>
          )}

          {renderDescription && (
            <Section>
              <DocumentRenderer document={homepage.description.document} />
            </Section>
          )}

          {experiences.length > 0 && (
            <Section title="Pick an Experience">
              <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
                {experiences.map((item, index) => (
                  <div className="snap-center shrink-0 w-full my-3" key={index}>
                    <div className="shrink-0 flex flex-col">
                      <Link href={`/experiences/${item.url}`} passHref>
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

              <SectionLink href={`/experiences`} text={"See all experiences"} />
            </Section>
          )}

          {filteredComments.length > 0 && (
            <Section title="Art Social">
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
        </main>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const content = await apolloClient.query({
    query: GET_STATIC_CONTENTS,
    variables: { slug: "" },
  });

  const experiences = await apolloClient.query({
    query: GET_ALL_EXPERIENCES,
  });

  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
  });

  const artworks = await apolloClient.query({
    query: GET_ALL_ARTWORKS,
  });

  return addApolloState(apolloClient, {
    props: {
      content: content.data.staticContents,
      experiences: experiences.data.experiences,
      comments: comments.data.comments,
      artworks: artworks.data,
    },
    revalidate: 1,
  });
}
