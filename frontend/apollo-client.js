import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://admin.tovech.com/api/graphql`,
  cache: new InMemoryCache(),
});

export default client;
