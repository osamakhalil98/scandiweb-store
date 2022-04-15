import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const link = from([errorLink, new HttpLink({ uri: process.env.DEV })]);

const client = new ApolloClient({
  cache: InMemoryCache(),
  link: link,
});
