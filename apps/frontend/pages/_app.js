import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/apollo-client";
import * as gtag from "config/gtag";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import "styles/globals.css";
import "styles/imports.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString("en-US"));

    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ApolloProvider client={apolloClient}>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', ${formattedDate});
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
