import Head from "next/head";
import Navigation from "components/Navigation";

export default function Header({ siteId, logo }) {
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
            <Navigation siteId={siteId} logo={logo} />
          </div>
        </div>
      </header>
    </>
  );
}
