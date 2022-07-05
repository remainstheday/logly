import { Formik } from "formik";
import Head from "next/head";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import PublicHeader from "components/PublicHeader";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";

const customLoader = ({ src }) => {
  return src;
};

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
  const [mobileMenu, updateMobileMenu] = useState(false);
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
          <Formik
            initialValues={{
              siteId: "",
              name: "",
              email: "",
              emailConfirmation: "",
              password: "",
            }}
            validationSchema={registrationSchema}
            onSubmit={(values, { setSubmitting }) => {
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
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting || errors}
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
            <button ref={stripeRef} type="submit" role="link">
              Checkout
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Logly Corp. All rights reserved.
          </p>
        </div>
      </main>
      <footer className="w-full px-3 py-10 mt-20 bg-zinc-900 text-white">
        <div className="flex justify-between max-w-4xl mx-auto">
          <ul>
            <li>
              <h3 className="uppercase font-bold">Social</h3>
            </li>

            <li>
              <div className="flex">
                <LogoInstagram
                  className="mr-4"
                  color={"#fff"}
                  onClick={() =>
                    window.open("https://www.instagram.com/_logly", "_blank")
                  }
                />
                <LogoLinkedin
                  color={"#fff"}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/logly-world/",
                      "_blank"
                    )
                  }
                />
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <h3 className="uppercase font-bold">About</h3>
            </li>
            <li>
              <Link href={"/about"} passHref>
                <a>About Logly</a>
              </Link>
            </li>
            <li>
              <Link href={"/media"} passHref>
                <a>Media</a>
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <h3 className="uppercase font-bold">Legal</h3>
            </li>
            <li>
              <Link href={"/privacy-policy"} passHref>
                <a>Privacy Policy</a>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
