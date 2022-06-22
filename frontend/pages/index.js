import Footer from "components/Footer";
import { GET_ALL_SITES } from "apollo/api";
import { addApolloState, initializeApollo } from "apollo/apollo-client";
import PageLoading from "components/PageLoading";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function IndexPage({ sites }) {
  const [mobileMenu, updateMobileMenu] = useState(false);
  if (!sites) return <PageLoading />;

  return (
    <>
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
      </>
      <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
        <main>
          <h1>Logly is a tool for self representation.</h1>
          <Link href="/register">Get Started</Link>
          <p>
            Logly is{" "}
            <strong>
              more than a digital guide. Its an interactive experience.
            </strong>{" "}
            Your Visitors can become active participants.
          </p>
          <p>
            Who are your visitors? What inspires them? On Logly they can share
            their stories with you.
          </p>

          <section>
            <h2>What your visitors see</h2>
            <div className="inline-screenshots"></div>
          </section>
          <section>
            <h2>What you see</h2>
            <div className="inline-screenshots"></div>
          </section>

          <section>
            <h2>Pricing</h2>
            <div className="pricing">
              <h3>Logly Premium</h3>
              <ul>
                <li>-Unlimited guides</li>
              </ul>
            </div>
          </section>

          <section>
            <h3>FAQ</h3>
            <ul>
              <li>What is Logly?</li>
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const sites = await apolloClient.query({
    query: GET_ALL_SITES,
  });

  return addApolloState(apolloClient, {
    props: {
      sites: sites.data.sites,
    },
    revalidate: 1,
  });
}
