import Header from "components/Header";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import Footer from "components/Footer";
import React, { useState } from "react";
import Image from "next/image";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import { ADD_COMMENT, GET_ALL_COMMENTS } from "apollo/api";
import { truncateComment } from "utils/truncateText";
import { Formik } from "formik";
import ImageUploader from "components/ImageUploader";
import ClientOnly from "components/ClientOnly";
import processCloudinaryImage from "utils/processCloudinaryImage";
import { useMutation } from "@apollo/client";

export default function Community({ comments }) {
  const [filteredComments, updateFilteredComments] = useState(comments);
  const [uploadedImage, setUploadedImage] = useState();
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);
  const handleFormSubmit = async (username, comment) => {
    await Promise.resolve(processCloudinaryImage(uploadedImage)).then(
      (cloudinaryImage) => {
        addComment({
          variables: {
            username,
            comment,
            image: cloudinaryImage ? cloudinaryImage : "",
            artworkId: "",
            experienceId: "",
          },
          update: (cache, { data }) => {
            const { comments } = cache.readQuery({
              query: GET_ALL_COMMENTS,
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
      <Header />
      <div className="min-h-screen">
        <div className="max-w-4xl px-6 md:px-0 mx-auto md:mx-auto">
          <BackLink href={"/"} text={"Home"} />
          <PageTitle largeText={"Community"} />
          <section className="mt-20 md:mt-32 mx-auto">
            <h3 className="pb-3 section-title">Share Thoughts and Images</h3>
            <hr />
            {!data && !error && (
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
            )}
            {data && (
              <p className="mt-6 mb-56">
                Thank you for participating. Your comment has been added to the
                Community Page!
              </p>
            )}
            {error && <p className="mt-6 mb-56">Error: {error.message}</p>}
          </section>
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
                  <div
                    key={post.id}
                    className="break-inside mb-3 bg-white overflow-hidden"
                  >
                    {post.image.length > 0 && (
                      <Image
                        src={post.image}
                        width="1080"
                        height="720"
                        alt={post.title}
                      />
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
        )}
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_ALL_COMMENTS,
  });

  return addApolloState(apolloClient, {
    props: { comments: data.comments },
    revalidate: 1,
  });
}
