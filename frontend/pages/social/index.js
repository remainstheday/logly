import Header from "components/Header";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import Footer from "components/Footer";
import React from "react";
import Image from "next/image";
import { initializeApollo } from "apollo/apollo-client";
import { GET_ALL_COMMENTS } from "apollo/api";
import SocialForm from "components/SocialForm";
import { truncateComment } from "utils/truncateText";

export default function Social({ comments }) {
  return (
    <>
      <Header />
      <div className="max-w-4xl px-6 md:px-0 mx-auto md:mx-auto">
        <BackLink href={"/"} text={"Home"} />
        <PageTitle largeText={"ART Social"} />
        <section className="mt-20 md:mt-32 mx-auto">
          <h3 className="pb-3 section-title">Share Thoughts and Images</h3>
          <hr />
          <SocialForm />
        </section>
      </div>
      <section className="mt-20 md:mt-32 ">
        <div className="filter max-w-4xl mx-auto">
          <h3 className="pb-3 px-6 md:px-0 section-title">
            See what the community has shared
          </h3>
        </div>
        <div className="w-full bg-slate-100 shadow-inner py-6 px-3">
          <div className="masonry-2-col md:masonry-3-col">
            {comments.map((post) => (
              <div
                key={post.id}
                className="break-inside mb-3 bg-white overflow-hidden"
              >
                {post.image.length > 0 && (
                  <Image src={post.image} width="1080" height="720" />
                )}
                <div className="px-3 py-3">
                  <p className="text-gray-700 text-base">
                    {truncateComment(post.comment)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <br />
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
  });

  return {
    props: { comments: comments.data.comments },
  };
}
