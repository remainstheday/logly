import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";

export default function IndexPage() {
  const [mobileMenu, updateMobileMenu] = useState(false);

  return (
    <>
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
      <div>
        <header className="pt-4 max-w-4xl mx-auto md:mx-auto">
          <div className="flex flex-wrap pt-2">
            <div className="w-full">
              <nav className="relative flex items-center justify-between py-3 w-full rounded">
                <div className="w-full relative mx-auto flex flex-wrap items-center justify-end text-right">
                  <div className="w-full relative flex justify-start">
                    <Link href={`/`} passHref>
                      <a>
                        <Image
                          src="/logly-logo.png"
                          alt="logly-logo"
                          width="125"
                          height="50"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <div className="mt-24 mx-auto md:mx-auto w-8/12 mx-auto">
          <h1 className="text-5xl text-center mb-10">
            Logly is a community, a classroom, and an archive.
          </h1>
          <p>
            Our platform enables cultural institutions to{" "}
            <strong>
              {" "}
              easily build digital guides and instantly create immersive
              experiences for guests.
            </strong>
          </p>
          <br />
          <p>
            By providing an <strong>interactive space</strong>, visitors can
            share their thoughts with others — and{" "}
            <strong>
              cultural institutions can learn from their audience.{" "}
            </strong>
          </p>

          <div className="mt-12">
            <strong className="block text-center">
              sign up for logly news + updates.
            </strong>

            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://f.convertkit.com/ckjs/ck.5.js"></script>
            <form
              action="https://app.convertkit.com/forms/3337562/subscriptions"
              className="seva-form formkit-form"
              method="post"
              data-sv-form="3337562"
              data-uid="32f877138b"
              data-format="inline"
              data-version="5"
              data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Thank you for subscribing!","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":false},"return_visitor":{"action":"hide","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
              min-width="400 500 600 700 800"
            >
              <div data-style="clean">
                <ul
                  className="formkit-alert formkit-alert-error"
                  data-element="errors"
                  data-group="alert"
                ></ul>
                <div
                  data-element="fields"
                  data-stacked="false"
                  className="seva-fields formkit-fields flex flex-inline justify-center mt-5"
                >
                  <div className="formkit-field w-1/2">
                    <input
                      className="formkit-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="email_address"
                      aria-label="Email Address"
                      placeholder="Email Address"
                      required=""
                      type="email"
                    />
                  </div>
                  <button
                    data-element="submit"
                    style={{ backgroundColor: "#002FA7" }}
                    className="formkit-submit formkit-submit ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    <div className="formkit-spinner">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <span className="">Subscribe</span>
                  </button>
                </div>
              </div>
            </form>
            <i className="block text-center">
              We respect your privacy. Unsubscribe at any time.
            </i>
          </div>
        </div>
        <footer className="w-full fixed bottom-0 px-3 py-10 mt-20 bg-zinc-900 text-white">
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
      </div>
    </>
  );
}
