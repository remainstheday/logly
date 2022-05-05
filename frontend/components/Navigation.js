import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenu, updateMobileMenu] = useState(false);
  return (
    <>
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
                <Link href={`/about`} passHref>
                  <a className="text-right">Museum Information</a>
                </Link>
              </li>
              <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75">
                <Link href={`/experiences`} passHref>
                  <a>Experiences</a>
                </Link>
              </li>
              <li className="py-2 pr-0 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 block ">
                <Link href={`/social`} passHref>
                  <a className="text-right block">Art Social</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
