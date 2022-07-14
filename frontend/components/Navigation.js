import Link from "next/link";
import { useState } from "react";

export default function Navigation({ siteId, logo }) {
  const [mobileMenu, updateMobileMenu] = useState(false);

  return (
    <>
      <nav className="relative flex items-center justify-between py-3 w-full rounded">
        <div className="w-full relative mx-auto flex flex-wrap items-center justify-end text-right">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href={`/${siteId}`} passHref>
              <a className="text-sm font-bold leading-relaxed inline-block mr-4 whitespace-nowrap uppercase text-white">
                <img
                  src={logo && logo.url ? logo.url : "/Logo.png"}
                  alt={siteId}
                  width={logo.width}
                  height={logo.height}
                  style={{ maxWidth: 200, maxHeight: 100 }}
                />
              </a>
            </Link>
            <button
              className="scroll absolute right-1 top-4 -mt-4 cursor-pointer text-xl leading-none border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
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
                <Link href={`/${siteId}/about`} passHref>
                  <a className="text-right">About</a>
                </Link>
              </li>
              <li className="py-2 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75">
                <Link href={`/${siteId}/experiences`} passHref>
                  <a>Experiences</a>
                </Link>
              </li>
              <li className="py-2 pr-0 flex justify-end text-sm uppercase font-bold leading-snug text-black hover:opacity-75 block ">
                <Link href={`/${siteId}/community`} passHref>
                  <a className="text-right block">Community</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
