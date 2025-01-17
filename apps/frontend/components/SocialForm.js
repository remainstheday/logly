import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "apollo/api";
import ClientOnly from "components/ClientOnly";
import ImageUploader from "components/ImageUploader";
import { Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import processCloudinaryImage from "utils/processCloudinaryImage";

export default function SocialForm({ query }) {
  const [uploadedImage, setUploadedImage] = useState();
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => setFormattedDate(new Date()), []);

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
            timestamp: formattedDate,
          },
        });
      }
    );
  };

  if (error) return <p>Error: {error.message}</p>;
  if (data)
    return (
      <p className="mt-6 mb-56">
        Thank you for participating. Your comment has been added to the{" "}
        <Link href={`/${query.site}/community?social=true`} passHref>
          <a className="text-blue-600 visited:text-purple-60">Community Page</a>
        </Link>
        !
      </p>
    );

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
                disabled={!values.username || !values.comment || loading}
                className="submit-btn w-full disabled:bg-slate-200"
              >
                {loading ? "Loading..." : "Share"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ClientOnly>
  );
}
