import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/apollo-client";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
