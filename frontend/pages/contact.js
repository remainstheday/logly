import React from "react";
import Section from "components/Section";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";
import { Formik } from "formik";

export default function Contact() {
  return (
    <>
      <PublicHeader />
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <Section>
          <h1 className="text-5xl text-center mb-10">Contact</h1>
          <Formik
            initialValues={{
              name: "",
              email: "",
              description: "",
            }}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, handleChange, handleSubmit }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.name}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="name"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.email}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="name"
                  >
                    Description
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={values.description}
                  />
                </div>
              </form>
            )}
          </Formik>
        </Section>
      </div>
      <PublicFooter />
    </>
  );
}
