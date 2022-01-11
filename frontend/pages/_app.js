import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
