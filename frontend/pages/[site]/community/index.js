import Header from "components/Header";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import Footer from "components/Footer";
import React, { useState } from "react";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import {
  ADD_COMMENT,
  GET_ALL_COMMENTS,
  GET_ALL_SITES,
  GET_SITE_CONTENT,
} from "apollo/api";
import { Formik } from "formik";
import ImageUploader from "components/ImageUploader";
import ClientOnly from "components/ClientOnly";
import processCloudinaryImage from "utils/processCloudinaryImage";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Section from "components/Section";
import PageLoading from "components/PageLoading";
import CommentCard from "../../../components/CommentCard";

export default function Community({ content, comments = [] }) {
  const { query } = useRouter();
  const [filteredComments, updateFilteredComments] = useState(comments);
  const [uploadedImage, setUploadedImage] = useState();
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);

  if (!content) return <PageLoading />;

  const handleFormSubmit = async (username, comment) => {
    await Promise.resolve(processCloudinaryImage(uploadedImage)).then(
      (cloudinaryImage) => {
        addComment({
          variables: {
            username,
            comment,
            image: cloudinaryImage ? cloudinaryImage : "",
            artifactId: "",
            experienceId: "",
            timestamp: new Date(Date.now()),
            siteId: query.site,
          },
          update: (cache, { data }) => {
            const { comments } = cache.readQuery({
              query: GET_ALL_COMMENTS,
              variables: { siteId: query.site },
            });

            cache.writeQuery({
              query: GET_ALL_COMMENTS,
              data: {
                comments: [data.createComment, ...comments],
              },
            });
          },
          onCompleted: (data) =>
            updateFilteredComments([data.createComment, ...comments]),
        });
      }
    );
  };

  return (
    <>
      <Header
        siteId={query.site}
        logo={{
          url: content.siteLogo,
          width: content.logoWidth,
          height: content.logoHeight,
        }}
      />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <BackLink href={`/${query.site}`} text={"Home"} />
          <PageTitle largeText={"Community"} />
          {query.social === "true" && !data && !error && (
            <div className="mt-6">
              <h3 className="pb-3 section-title">Share Thoughts and Images</h3>
              <hr />

              <ClientOnly>
                <Formik
                  initialValues={{ username: "", comment: "" }}
                  onSubmit={async (values) => {
                    await handleFormSubmit(values.username, values.comment);
                  }}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="social-form">
                      <input
                        required
                        name="username"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        placeholder="Full Name"
                      />
                      <textarea
                        required
                        name="comment"
                        maxLength="280"
                        onChange={handleChange}
                        className="w-full"
                        rows="5"
                        placeholder="Leave your thoughts and images at the moment"
                      />
                      <div className="space-y-3">
                        <ImageUploader
                          onUpload={(image) => setUploadedImage(image)}
                        />
                        <button
                          type="submit"
                          disabled={
                            !values.username || !values.comment || loading
                          }
                          className="submit-btn w-full disabled:bg-slate-200"
                        >
                          {loading ? "Loading..." : "Share"}
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </ClientOnly>

              {data && (
                <p className="mt-6 mb-56">
                  Thank you for participating. Your comment has been added to
                  the Community Page!
                </p>
              )}
              {error && <p className="mt-6 mb-56">Error: {error.message}</p>}
            </div>
          )}
        </Section>
      </div>
      {filteredComments.length > 0 && (
        <section className="mt-20 md:mt-32 ">
          <div className="filter max-w-4xl mx-auto">
            <h3 className="pb-3 px-6 md:px-0 section-title">
              See what the community has shared
            </h3>
          </div>
          <div className="w-full bg-slate-100 shadow-inner py-6 px-3">
            <div className="masonry-2-col md:masonry-3-col">
              {filteredComments.map((post) => (
                <CommentCard comment={post} key={post.id} />
                // <div
                //   key={post.id}
                //   className="break-inside mb-3 bg-white overflow-hidden"
                // >
                //   {post.image.length > 0 && (
                //     <div className="aspect-w-16 aspect-h-9">
                //       <img src={post.image} alt={post.title} />
                //     </div>
                //   )}
                //   <div className="px-3 py-3">
                //     <p className="text-gray-700 text-sm">
                //       {truncateComment(post.comment)}
                //     </p>
                //     <span>
                //       <i className="text-gray-400 text-xs">
                //         Comment by {post.username} on{" "}
                //         {post.timestamp &&
                //           format(new Date(post.timestamp), "MMM dd, yyyy")}
                //       </i>
                //     </span>
                //   </div>
                // </div>
              ))}
            </div>
            <br />
          </div>
        </section>
      )}
      <Footer siteId={query.site} />
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
  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });
  const content = await apolloClient.query({
    query: GET_SITE_CONTENT,
    variables: { siteId: params.site },
  });
  return addApolloState(apolloClient, {
    props: {
      content: content.data.siteContents.find((item) => item.name === "Home"),
      comments: comments.data.comments.filter(
        (item) => item.siteId === params.site
      ),
    },
    revalidate: 1,
  });
}
