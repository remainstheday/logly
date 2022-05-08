import {ApolloClient, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    ssrMode: true,
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
});

export default client;