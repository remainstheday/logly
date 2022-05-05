import Footer from "components/Footer";
import Header from "components/Header";
import PageTitle from "components/PageTitle";
import SectionLink from "components/SectionLink";
import {
  GET_ALL_ARTWORKS,
  GET_ALL_COMMENTS,
  GET_ALL_EXPERIENCES,
  GET_STATIC_CONTENTS,
} from "lib/api";
import Image from "next/image";
import client from "lib/apollo-client";
import PageLoading from "components/PageLoading";
import CommentCard from "components/CommentCard";
import React from "react";
import Link from "next/link";
import Section from "components/Section";

export default function Home({ content, experiences, comments }) {
  if (!content || !experiences) return <PageLoading />;

  const homepage = content[0];
  console.log(comments);
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <main>
          <PageTitle smallText={"welcome to"} largeText={homepage.title} />
          <div className="flex relative my-16">
            <Image
              src={
                homepage.poster
                  ? homepage.poster.publicUrl
                  : "/stock-museum-1.jpg"
              }
              width="1080"
              height="720"
            />
          </div>

          <Section>
            <h3>{homepage.description}</h3>
          </Section>

          <Section title="Pick an Experience">
            <div className="custom-scrollbar relative w-full flex gap-6 my-6 snap-x snap-mandatory overflow-x-auto md:inline-grid md:gap-2 md:grid-cols-2">
              {experiences.map((item, index) => (
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

            <SectionLink href={`/experiences`} text={"See all experiences"} />
          </Section>

          <Section title="Art Social">
            <div className="px-3 md:px-0">
              {comments && <CommentCard comments={comments} />}
            </div>
            <div className="mt-6 px-6 md:px-0">
              <SectionLink href={`/social`} text={"Discover Art Social"} />
            </div>
          </Section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const content = await client.query({
    query: GET_STATIC_CONTENTS,
    variables: { slug: "" },
  });
  const experiences = await client.query({
    query: GET_ALL_EXPERIENCES,
  });
  const artworks = await client.query({
    query: GET_ALL_ARTWORKS,
  });
  const comments = await client.query({
    query: GET_ALL_COMMENTS,
  });

  return {
    props: {
      experiences: experiences.data.experiences,
      artworks: artworks.data,
      content: content.data.staticContents,
      comments: comments.data.comments,
    },
  };
}
