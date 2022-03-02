/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Heading } from "@keystone-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Layout } from "../components/Layout";
import { useQuery } from "@keystone-6/core/admin-ui/apollo";

export default function Pages() {
  return (
    <Layout pageTitle="Pages">
      <h2>Home Page Content</h2>
      <section
        css={{
          marginTop: "5rem",
        }}
      >
        <h3>Page Title</h3>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                css={{ border: "1px solid black" }}
                type="text"
                name="title"
                className="form-input rounded"
              />
              <ErrorMessage name="title" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>

      <section
        css={{
          marginTop: "5rem",
        }}
      >
        <h3>Page Description</h3>
        <Formik
          initialValues={{ title: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                css={{ border: "1px solid black" }}
                type="textarea"
                as="textarea"
                name="description"
              />
              <ErrorMessage name="title" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </Layout>
  );
}
