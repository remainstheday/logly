import { Formik } from "formik";
import Head from "next/head";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { fetchPostJSON } from "utils/api-helpers";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);
const registrationSchema = Yup.object().shape({
  siteId: Yup.string()
    .min(3, "too short!")
    .max(50, "too long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "too short").required("required"),
});
export default function Register() {
  const stripeRef = useRef();
  const [mobileMenu, updateMobileMenu] = useState(false);
  const [error, setError] = useState();

  const postFormData = async (values) => {
    await fetch("http://localhost:3000/api/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => setError(data.message))
      .then(async () => {
        stripeRef.current.click();
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
    <div>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <header className="pt-4 max-w-4xl mx-auto md:mx-auto">
        <div className="flex flex-wrap pt-2">
          <div className="w-full">
            <nav className="relative flex items-center justify-between py-3 w-full rounded">
              <div className="w-full relative mx-auto flex flex-wrap items-center justify-end text-right">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  <Link href={`/`} passHref>
                    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                      <Image
                        src="/Logo.png"
                        className="w-1/3"
                        alt="logly-logo"
                        width="50"
                        height="50"
                      />
                    </a>
                  </Link>
                  <button
                    className="cursor-pointer text-xl mr-6 leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => updateMobileMenu(!mobileMenu)}
                  >
                    <span className="block relative w-8 h-0.5 rounded-sm bg-black"></span>
                    <span className="block relative w-8 h-0.5 rounded-sm bg-black mt-1"></span>
                    <span className="block relative w-8 h-0.5 rounded-sm bg-black mt-1"></span>
                  </button>
                </div>
                <div
                  className={`${
                    mobileMenu ? "visible" : "invisible"
                  } flex pr-6 bg-white absolute pt-6 w-1/2 sm:w-1/3 h-screen right-0 top-12 z-10 lg:visible lg:static lg:pt-0 lg:w-auto lg:h-auto lg:pr-0 lg:flex-grow`}
                >
                  <ul className="flex flex-col lg:flex-row list-none ml-auto text-right text-right space-x-12">
                    <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 ">
                      <Link href={`/contact`} passHref>
                        <a className="text-right">Contact</a>
                      </Link>
                    </li>
                    <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75">
                      <Link href={`/register`} passHref>
                        <a>Signup/Login</a>
                      </Link>
                    </li>
                    <li className="py-2 pr-0 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 block ">
                      <Link href={`/pricing`} passHref>
                        <a className="text-right block">Pricing</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-lg mt-20 mx-auto min-h-screen md:mx-auto">
        <div>
          <h1 className="text-4xl mb-5 font-bold text-center">
            Welcome to Logly
          </h1>
          <Formik
            initialValues={{
              siteId: "",
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={registrationSchema}
            onSubmit={(values, { setSubmitting }) => {
              postFormData(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <h3 className="text-center">New Account</h3>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.siteId}
                  />
                  {errors.siteId && touched.siteId && errors.siteId}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                {errors.password && touched.password && errors.password}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting}
                >
                  Continue to Payment
                </button>

                {error && <p className="text-red">{error}</p>}
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
    </div>
  );
}
