import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { LogoInstagram, LogoLinkedin } from "react-ionicons";
import Section from "components/Section";

const customLoader = ({ src }) => {
  return src;
};

export default function About() {
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
                          loader={customLoader}
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

        <div className="max-w-4xl mx-auto min-h-screen md:mx-auto">
          <Section>
            <h1 className="text-5xl text-center mb-10">About</h1>
            <p>
              Logly is an educational tool and digital conversation space for
              cultural institutions of all sizes. Our mission is to enhance
              visitor interaction and help museums build communities by
              providing accessible digital technologies.
            </p>
          </Section>
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
