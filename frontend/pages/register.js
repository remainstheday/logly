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
  password: Yup.string().min(8, "too short").required("required"),
});
export default function Register() {
  const stripeRef = useRef();
  const [errors, setErrors] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const postFormData = async (values) => {
    setErrors(undefined);
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
        setErrors(undefined);
        if (data.success) stripeRef.current.click();
      })
      .catch((error) => {
        setErrors(error.message);
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
          <h1 className="text-4xl mb-5 font-bold text-center">
            Sign up for Logly
          </h1>
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
            }}
            validationSchema={registrationSchema}
            onSubmit={(values) => {
              postFormData(values);
            }}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
                      setErrors(null);
                      handleChange(e);
                    }}
                    value={values.name}
                  />
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
                      setErrors(null);
                      handleChange(e);
                    }}
                    value={values.email}
                  />
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
                      setErrors(null);
                      handleChange(e);
                    }}
                  />
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
                      setErrors(null);
                      handleChange(e);
                    }}
                    value={values.siteId}
                  />
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
                      setErrors(null);
                      handleChange(e);
                    }}
                    value={values.password}
                  />
                </div>
                <div className="my-4">
                  <input type="checkbox" name="terms-conditions" />
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
                <button
                  type="submit"
                  style={{ backgroundColor: "#002FA7" }}
                  className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting}
                >
                  {loading ? "Loading..." : "Continue to Payment"}
                </button>
                {errors && <p className="text-red-600">{errors}</p>}
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
