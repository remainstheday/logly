import Head from "next/head";
import Navigation from "components/Navigation";

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

      <header className="py-4 max-w-4xl mx-auto md:mx-auto">
        <div className="flex flex-wrap py-2">
          <div className="w-full">
            <Navigation />
          </div>
        </div>
      </header>
    </>
  );
}
