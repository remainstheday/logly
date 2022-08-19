import Header from "components/Header";
import BackLink from "components/BackLink";
import PageTitle from "components/PageTitle";
import Footer from "components/Footer";
import React, { useState } from "react";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import { ADD_COMMENT, GET_ALL_COMMENTS, GET_SITE_LOGO } from "apollo/api";
import { Formik } from "formik";
import ImageUploader from "components/ImageUploader";
import ClientOnly from "components/ClientOnly";
import processCloudinaryImage from "utils/processCloudinaryImage";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Section from "components/Section";
import CommentCard from "../../../components/CommentCard";

export default function Community({ logo, comments = [] }) {
  const { query } = useRouter();
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
            query,
            siteId: query.site,
            timestamp: new Date(Date.now()),
          },
          onCompleted: (data) =>
            updateFilteredComments([data.createComment, ...comments]),
        });
      }
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <Header siteId={query.site} logo={logo} />
      <div className="flex-grow w-full max-w-4xl mx-auto">
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
          <div className="w-full bg-slate-100 shadow-inner py-6 px-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredComments.map((post) => (
                <CommentCard comment={post} key={post.id} />
              ))}
            </div>
            <br />
          </div>
        </section>
      )}
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
  const comments = await apolloClient.query({
    query: GET_ALL_COMMENTS,
    variables: { siteId: params.site },
  });

  return addApolloState(apolloClient, {
    props: {
      logo,
      comments: comments.data.comments,
    },
  });
}
