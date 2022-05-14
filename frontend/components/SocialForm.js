import React, { useState } from "react";
import ImageUploader from "components/ImageUploader";
import { useMutation } from "@apollo/client";
import ClientOnly from "components/ClientOnly";
import { Formik } from "formik";
import processCloudinaryImage from "utils/processCloudinaryImage";
import { ADD_COMMENT } from "apollo/api";

export default function SocialForm({ artworkId = "", experienceId = "" }) {
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
            artworkId,
            experienceId,
          },
        });
      }
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) return <p>Thank you!</p>;

  return (
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
              <ImageUploader onUpload={(image) => setUploadedImage(image)} />
              <button
                type="submit"
                disabled={!values.username || !values.comment}
                className="submit-btn w-full disabled:bg-slate-200"
              >
                Share
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ClientOnly>
  );
}
