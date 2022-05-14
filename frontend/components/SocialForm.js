import React, { useState } from "react";
import processImage from "utils/processImageUpload";
import ImageUploader from "components/ImageUploader";
import { gql, useMutation } from "@apollo/client";
import ClientOnly from "components/ClientOnly";
import { Formik } from "formik";

const ADD_COMMENT = gql`
  mutation CreateComment(
    $username: String!
    $comment: String!
    $image: String!
    $artworkId: String
    $experienceId: String
  ) {
    createComment(
      data: {
        username: $username
        comment: $comment
        image: $image
        artworkId: $artworkId
        experienceId: $experienceId
      }
    ) {
      id
      username
      comment
      image
      experienceId
      artworkId
    }
  }
`;
export default function SocialForm({ artworkId = "", experienceId = "" }) {
  const [uploadedImage, setUploadedImage] = useState();
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (username, comment) => {
    let image = "";
    if (uploadedImage) image = await processImage(uploadedImage);
    console.log(image);
    const url = "https://api.cloudinary.com/v1_1/djfxpvrca/image/upload";
    const formData = new FormData();
    formData.append("file", uploadedImage[0]);
    formData.append("upload_preset", "ekqp8s1g");

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        addComment({
          variables: {
            username,
            comment,
            image: data.url,
            artworkId,
            experienceId,
          },
        });
      });
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
        className="social-form"
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
