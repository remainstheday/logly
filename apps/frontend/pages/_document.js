import { Head, Html, Main, NextScript } from "next/document";
import { useRouter } from "next/router";

export default function Document() {
  const router = useRouter();

  return (
    <Html>
      <Head title="logly world">
        <title>logly.world</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
