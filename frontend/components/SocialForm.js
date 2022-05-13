import React, { useState } from "react";
import processImage from "utils/processImageUpload";
import ImageUploader from "components/ImageUploader";
import { gql, useMutation } from "@apollo/client";
import ClientOnly from "components/ClientOnly";

const ADD_COMMENT = gql`
  mutation CreateComment(
    $username: String!
    $comment: String!
    $image: String!
  ) {
    createComment(
      data: { username: $username, comment: $comment, image: $image }
    ) {
      id
      username
      relatedExperienceId
      relatedArtworkId
      comment
      image
    }
  }
`;
export default function SocialForm({ relatedArtworkId, relatedExperienceId }) {
  const [uploadedImage, setUploadedImage] = useState();
  const [commentName, updateCommentName] = useState("");
  const [commentDescription, updateCommentDescription] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async () => {
    let cloudinaryImage = null;
    if (uploadedImage) cloudinaryImage = await processImage(uploadedImage);
  };

  return (
    <ClientOnly>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleFormSubmit();
        }}
        className="social-form"
      >
        <input
          required
          onChange={(e) => updateCommentName(e.target.value)}
          type="text"
          placeholder="Full Name"
          className=""
        />
        <textarea
          required
          maxLength="280"
          onChange={(e) => updateCommentDescription(e.target.value)}
          className="w-full"
          name="comment"
          rows="5"
          placeholder="Leave your thoughts and images at the moment"
        />
        <div className="space-y-3">
          <ImageUploader onUpload={(image) => setUploadedImage(image)} />
          <button
            type="submit"
            disabled={!commentName || !commentDescription}
            className="submit-btn w-full disabled:bg-slate-200"
          >
            Share
          </button>
        </div>
      </form>

      <button
        onClick={() =>
          addComment({
            variables: {
              username: "@remainstheday",
              comment: "it still works",
              image: "",
            },
          })
        }
      >
        click me
      </button>
    </ClientOnly>
  );
}
