import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export default function PublicHeader() {
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
      <header className="max-w-4xl px-6 lg:px-0 my-8 md:mx-auto pt-4 mx-auto md:mx-auto">
        <div className="flex flex-wrap pt-2">
          <div className="w-full">
            <nav className="relative flex items-center justify-between py-3 w-full rounded">
              <div className="w-full relative mx-auto flex flex-wrap items-center justify-end text-right">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                  <Link href={`/`} passHref>
                    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                      <img
                        src="/Logo.png"
                        alt="logly-logo"
                        width="25"
                        height="35"
                      />
                    </a>
                  </Link>
                  <button
                    className="scroll -mt-4 cursor-pointer text-xl leading-none border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                    type="button"
                    onClick={() => updateMobileMenu(!mobileMenu)}
                  >
                    <span className="block relative w-8 h-1 rounded-sm bg-black"></span>
                    <span className="block relative w-8 h-1 rounded-sm bg-black mt-1"></span>
                    <span className="block relative w-8 h-1 rounded-sm bg-black mt-1"></span>
                  </button>
                </div>
                <div
                  className={`${
                    mobileMenu ? "visible" : "invisible"
                  } flex pr-6 bg-white absolute pt-6 w-1/2 sm:w-1/3 h-screen right-0 top-12 z-10 lg:visible lg:static lg:pt-0 lg:w-auto lg:h-auto lg:pr-0 lg:flex-grow`}
                >
                  <ul className="flex flex-col lg:flex-row list-none ml-auto text-right text-right space-x-12">
                    <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 ">
                      <Link href="/contact" passHref>
                        <a className="text-right">Contact</a>
                      </Link>
                    </li>
                    <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 ">
                      <Link href="/faq" passHref>
                        <a className="text-right">FAQ</a>
                      </Link>
                    </li>
                    <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 ">
                      <Link href="/pricing" passHref>
                        <a className="text-right">Pricing</a>
                      </Link>
                    </li>
                    {/*<li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75">*/}
                    {/*  <Link href="/register" passHref>*/}
                    {/*    <a>Login/Sign up</a>*/}
                    {/*  </Link>*/}
                    {/*</li>*/}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
