import { Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import PublicHeader from "components/PublicHeader";
import PublicFooter from "components/PublicFooter";

const registrationSchema = Yup.object().shape({
  siteId: Yup.string()
    .min(3, "too short!")
    .max(50, "too long!")
    .lowercase("must be lowercase")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  emailConfirmation: Yup.string().oneOf(
    [Yup.ref("email"), null],
    "emails must match"
  ),
  password: Yup.string()
    .min(8, "Passwords must be at least 8 characters")
    .required("password is required"),
  terms: Yup.boolean().required("required"),
});
export default function Register() {
  const stripeRef = useRef();
  const [userErrors, setUserErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const postFormData = async (values, setSubmitting) => {
    setUserErrors(undefined);
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, url: `/${values.url}` }),
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
        setUserErrors(undefined);
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
              terms: false,
            }}
            validationSchema={registrationSchema}
            onSubmit={(values, { setSubmitting }) => {
              postFormData(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    onChange={(e) => {
                      setUserErrors(null);
                      handleChange(e);
                    }}
                    value={values.name}
                  />
                  {errors.name && touched.name ? (
                    <p className="text-red-600">{errors.name}</p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setUserErrors(null);
                      handleChange(e);
                    }}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-600">{errors.email}</p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-1"
                    htmlFor="email"
                  >
                    Confirm Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="emailConfirmation"
                    value={values.emailConfirmation}
                    onChange={(e) => {
                      setUserErrors(null);
                      handleChange(e);
                    }}
                  />
                  {errors.confirmEmail && touched.confirmEmail ? (
                    <p className="text-red-600">{errors.confirmEmail}</p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="siteId"
                  >
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="siteId"
                    onChange={(e) => {
                      setUserErrors(null);
                      handleChange(e);
                    }}
                    value={values.siteId}
                  />
                  {errors.siteId && touched.siteId ? (
                    <p className="text-red-600">{errors.siteId}</p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    onChange={(e) => {
                      setUserErrors(null);
                      handleChange(e);
                    }}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-600">{errors.password}</p>
                  ) : null}
                  <div className="my-4">
                    <input
                      type="checkbox"
                      name="terms-conditions"
                      value={values.terms}
                    />
                    <label htmlFor="terms-conditions">
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
                  </div>
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: "#002FA7" }}
                  className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting}
                >
                  {loading ? "Loading..." : "Continue to Payment"}
                </button>
                {userErrors && <p className="text-red-600">{userErrors}</p>}
              </form>
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
