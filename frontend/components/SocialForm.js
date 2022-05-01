import React, { useState } from "react";

import processImage from "utils/processImageUpload";
import ImageUploader from "components/ImageUploader";
import { useMutation } from "@apollo/client";
import client from "lib/apollo-client";

import { CREATE_COMMENT } from "lib/api";

export default function SocialForm({ relatedArtworkId }) {
  const [uploadedImage, setUploadedImage] = useState();
  const [commentName, updateCommentName] = useState("");
  const [commentDescription, updateCommentDescription] = useState("");
  const [createComment, { data, error, loading }] = useMutation(
    CREATE_COMMENT,
    { client }
  );

  const handleFormSubmit = async () => {
    let cloudinaryImage = null;
    if (uploadedImage) cloudinaryImage = await processImage(uploadedImage);

    await createComment({
      variables: {
        name: commentName,
        comment: commentDescription,
        relatedArtworkId: relatedArtworkId ? relatedArtworkId : null,
        image: cloudinaryImage,
      },
    });
  };

  if (loading) return "loading...";
  if (error) return <p>error text :(</p>;
  return (
    <>
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
    </>
  );
}
