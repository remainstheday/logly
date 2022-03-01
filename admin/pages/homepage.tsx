/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Heading } from "@keystone-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Layout } from "../components/Layout";

export default function Homepage() {
  return (
    <Layout pageTitle="Edit Homepage">
      <h1 className="uppercase">Title</h1>
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
    </Layout>
  );
}
