import PublicFooter from "components/PublicFooter";
import PublicHeader from "components/PublicHeader";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "too short!")
    .max(50, "too long!")
    .required(" *Required"),
  siteId: Yup.string()
    .min(3, "too short!")
    .max(50, "too long!")
    .lowercase(" *must be lowercase")
    .required(" *Required"),
  email: Yup.string().email(" *Invalid email").required(" *Required"),
  emailConfirmation: Yup.string()
    .oneOf([Yup.ref("email"), null], " *emails must match")
    .required(" *Required"),
  password: Yup.string()
    .min(8, "Passwords must be at least 8 characters")
    .required(" *Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], " *passwords must match")
    .min(8, "Passwords must be at least 8 characters")
    .required(" *Required"),
  terms: Yup.boolean().oneOf([true], " *Required").required(" *Required"),
});
export default function Register() {
  const stripeRef = useRef();
  const [userErrors, setUserErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const postFormData = async (values, setSubmitting) => {
    setUserErrors(null);
    setLoading(true);
    const formData = {
      siteId: values.siteId.trim(),
      name: values.name,
      email: values.email,
      password: values.password,
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restapi/newUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      })
      .then(async (data) => {
        setLoading(false);
        setUserErrors(null);
        setSubmitting(false);
        if (data.success) stripeRef.current.click();
      })
      .catch((error) => {
        setLoading(false);
        setSubmitting(false);
        setUserErrors(error.message);
      });
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const reservedSites = [
    "contact",
    "faq",
    "pricing",
    "register",
    "about",
    "media",
    "terms-of-use",
    "privacy-policy",
  ];
  const validateOrgName = (value) => {
    let error;
    if (reservedSites.some((site) => site === value)) {
      error = "*reserved keywords cannot be used as an organization name";
      return error;
    }
  };

  return (
    <>
      <PublicHeader />
      <main className="max-w-lg mt-20 mx-auto min-h-screen md:mx-auto">
        <div>
          <h1 className="text-5xl text-center mb-10">Sign up for Logly</h1>
          <span className="text-center block mt-2">
            Already have an account?{" "}
            <a
              href="https://admin.logly.world"
              className="underline font-bold"
              style={{ color: "#002FA7" }}
            >
              Login
            </a>
          </span>
          <Formik
            initialValues={{
              siteId: "",
              name: "",
              email: "",
              emailConfirmation: "",
              password: "",
              passwordConfirmation: "",
              terms: false,
            }}
            validationSchema={registrationSchema}
            onSubmit={(values, { setSubmitting }) => {
              postFormData(values, setSubmitting).then((r) => console.log(r));
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="name"
                  >
                    Full Name
                    {errors.name && touched.name ? (
                      <span className="text-red-600">{errors.name}</span>
                    ) : null}
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={values.name}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="email"
                  >
                    Email
                    {errors.email && touched.email ? (
                      <span className="text-red-600">{errors.email}</span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={values.email}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="email"
                  >
                    Confirm Email
                    {errors.emailConfirmation && touched.emailConfirmation ? (
                      <span className="text-red-600">
                        {errors.emailConfirmation}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="emailConfirmation"
                    value={values.emailConfirmation}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="siteId"
                  >
                    Organization Name{" "}
                    {errors.siteId && touched.siteId ? (
                      <span className="text-red-600">{errors.siteId}</span>
                    ) : null}
                  </label>
                  <Field
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="siteId"
                    onChange={(e) => handleChange(e)}
                    value={values.siteId}
                    validate={validateOrgName}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="password"
                  >
                    Password
                    {errors.password && touched.password ? (
                      <span className="text-red-600">{errors.password}</span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={values.password}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="passwordConfirmation"
                  >
                    Confirm Password
                    {errors.passwordConfirmation &&
                    touched.passwordConfirmation ? (
                      <span className="text-red-600">
                        {errors.passwordConfirmation}
                      </span>
                    ) : null}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="passwordConfirmation"
                    onChange={(e) => handleChange(e)}
                    value={values.passwordConfirmation}
                  />

                  <div className="my-4">
                    <Field type="checkbox" name="terms" />
                    <label htmlFor="terms">
                      {" "}
                      I agree to Logly’s{" "}
                      <Link href="/terms-of-use" passHref>
                        <a style={{ color: "#002FA7" }} className="underline">
                          Terms
                        </a>
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy-policy" passHref>
                        <a style={{ color: "#002FA7" }} className="underline">
                          Privacy Policy
                        </a>
                      </Link>
                      .
                    </label>
                    {errors.terms && touched.terms ? (
                      <p className="text-red-600">{errors.terms}</p>
                    ) : null}
                  </div>
                </div>
                <button
                  type="submit"
                  className={`bg-[#002FA7] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                  {loading ? "Loading..." : "Continue to Payment"}
                </button>
                {userErrors && <p className="text-red-600">{userErrors}</p>}
              </Form>
            )}
          </Formik>
          <form
            style={{ display: "none" }}
            action="/api/checkout_sessions"
            method="POST"
          >
            <button
              style={{ backgroundColor: "#002FA7" }}
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              ref={stripeRef}
              type="submit"
              role="link"
            >
              Checkout
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs">
            ©2022 Logly, LLC. All rights reserved.
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
