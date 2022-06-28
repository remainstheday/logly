import Footer from "components/Footer";
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
                      {/*<li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75">*/}
                      {/*  <Link href={`/register`} passHref>*/}
                      {/*    <a>Signup/Login</a>*/}
                      {/*  </Link>*/}
                      {/*</li>*/}
                      {/*<li className="py-2 pr-0 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 block ">*/}
                      {/*  <Link href={`/pricing`} passHref>*/}
                      {/*    <a className="text-right block">Pricing</a>*/}
                      {/*  </Link>*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>

        <div className="mt-24 mx-auto md:mx-auto ">
          <main>
            <div className="w-1/2 mx-auto">
              <h1 className="text-5xl text-center mb-10">
                Logly is a tool for self representation.
              </h1>
              <p>
                Logly is{" "}
                <strong>
                  more than a digital guide. Its an interactive experience.
                </strong>{" "}
                Your Visitors can become active participants.
              </p>
              <p>
                Who are your visitors? What inspires them? On Logly they can
                share their stories with you.
              </p>
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
            </div>

            <section className="mt-40 mx-auto max-w-4xl">
              <h2 className="text-3xl text-center">What your visitors see</h2>
              <div className="flex flex-inline place-content-between mt-10 mx-auto inline-screenshots">
                <div className="w-60 screenshot-container">
                  <Image
                    src="/images/mobile-screenshot-homepage.png"
                    width="227"
                    height="342"
                  />
                  <p>A digital tool with your branding</p>
                </div>
                <div className="w-60 screenshot-container">
                  <Image
                    src="/images/mobile-screenshot-homepage.png"
                    width="227"
                    height="342"
                  />
                  <p>Tour guides with interpretative materials</p>
                </div>
                <div className="w-60 screenshot-container">
                  <Image
                    src="/images/mobile-screenshot-homepage.png"
                    width="227"
                    height="342"
                  />
                  <p>A space to share their thoughts + connect with others</p>
                </div>
              </div>
            </section>

            <section className="mt-40 mx-auto max-w-4xl">
              <h2 className="text-3xl text-center">What you see</h2>
              <div className="flex flex-inline items-center split-container">
                <Image
                  src="/images/desktop-screenshot-admin-experiences.png"
                  width="480"
                  height="460"
                />
                <div>
                  <h3 className="text-2xl font-bold">Create Guides</h3>
                  <p>
                    Build Educational and engaging experiences for your
                    community
                  </p>
                </div>
              </div>
              <div className="flex flex-inline items-center split-container">
                <div>
                  <h3 className="text-2xl font-bold">
                    Upload Interpretive Materials
                  </h3>
                  <p>
                    You can upload text, audio, and images to your experiences
                  </p>
                </div>
                <Image
                  src="/images/desktop-screenshot-admin-experiences.png"
                  width="480"
                  height="460"
                />
              </div>

              <div className="flex flex-inline items-center split-container">
                <Image
                  src="/images/desktop-screenshot-admin-experiences.png"
                  width="480"
                  height="460"
                />
                <div>
                  <h3 className="text-2xl font-bold">
                    Manage and Share Comments
                  </h3>
                  <p>See what your community thinks and decide what to share</p>
                </div>
              </div>
            </section>

            {/*<section>*/}
            {/*  <h2>Pricing</h2>*/}
            {/*  <div className="pricing">*/}
            {/*    <h3>Logly Premium</h3>*/}
            {/*    <ul>*/}
            {/*      <li>-Unlimited guides</li>*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*</section>*/}

            {/*<section>*/}
            {/*  <h3>FAQ</h3>*/}
            {/*  <ul>*/}
            {/*    <li>What is Logly?</li>*/}
            {/*  </ul>*/}
            {/*</section>*/}
          </main>
        </div>
        <footer
          className={`w-full px-3 py-10 mt-20 bg-zinc-900 text-white ${className}`}
        >
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
                <Link href={"/termsofuse"} passHref>
                  <a>Terms of Use</a>
                </Link>
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
