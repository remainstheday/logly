import { Head, Html, Main, NextScript } from "next/document";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Document() {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    console.log(router);
    setFormattedDate(new Date());
  }),
    [];
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', ${formattedDate});
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: 'window.location.pathname'});
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
