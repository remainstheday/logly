import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/apollo-client";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "styles/globals.css";
import "styles/imports.css";

// By default, scripts are loaded using the afterInteractive strategy,
// which means they are injected on the client-side and will run after hydration.
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <GoogleAnalytics trackPageViews gaMeasurementId="UA-212210451-1" />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
