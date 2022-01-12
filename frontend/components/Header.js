import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <div>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className=" flex justify-between px-4 py-4">
        <Image
          src="/logly.png"
          className="w-1/3"
          alt="logly-logo"
          width="100"
          height="50"
        />
        <div className="space-y-2">
          <div className="w-8 h-0.5 bg-gray-600"></div>
          <div className="w-8 h-0.5 bg-gray-600"></div>
          <div className="w-8 h-0.5 bg-gray-600"></div>
        </div>
      </header>
    </div>
  );
}
