import React from "react";
import { Formik } from "formik";

export default function SocialForm({}) {
  return (
    <>
      <p className="">Share Thoughts and Images</p>
      <Formik
        initialValues={{ username: "", comment: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label className="block my-4">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
              />
            </label>
            <label className="block my-6">
              <span className="text-gray-700">Thoughts & Comments</span>
              <textarea
                value={values.comment}
                onChange={handleChange}
                className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                name="comment"
                id="comment"
                cols="30"
                rows="10"
              />
              <button
                type="submit"
                className="px-4 py-2 font-semibold  bg-red-500 text-white rounded-none shadow-sm w-full mt-4"
              >
                Share
              </button>
            </label>
          </form>
        )}
      </Formik>
    </>
  );
}
