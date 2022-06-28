import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";

export default function Media() {
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
          <h2>Media</h2>
        </div>
        <footer className={`w-full px-3 py-10 mt-20 bg-zinc-900 text-white`}>
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
