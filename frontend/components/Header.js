import Head from "next/head";
import Navigation from "components/Navigation";

export default function Header() {
  return (
    <>
      <Head>
        <title>Logly</title>
        <meta name="description" content="Next generation museum tours" />
      </Head>

      <header className="pt-4 max-w-4xl mx-auto md:mx-auto">
        <div className="flex flex-wrap pt-2">
          <div className="w-full">
            <Navigation />
          </div>
        </div>
      </header>
    </>
  );
}
