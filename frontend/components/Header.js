import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { slide as Menu } from "react-burger-menu";

export default function Header() {
  return (
    <>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
          crossOrigin="true"
        />
      </Head>

      <header className="flex justify-between max-w-4xl mx-auto py-4 mx-3 md:mx-0">
        <Image
          src="/logly.png"
          className="w-1/3"
          alt="logly-logo"
          width="100"
          height="50"
        />

        <div className="relative mr-3 md:mr-0">
          <Menu right width={"350px"}>
            <Link href={`/`} passHref>
              Museum Information
            </Link>
            <Link href={`/experiences`} passHref>
              Experiences
            </Link>
            <Link href={`/art-social`} passHref>
              Art Social
            </Link>
          </Menu>
        </div>
      </header>
    </>
  );
}
