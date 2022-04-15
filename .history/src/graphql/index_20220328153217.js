import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, netweorkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map((message, location, path) => {
      alert(`GraphQL error ${message}`);
    });
  }
});
const link = from([errorLink, new HttpLink({ uri: process.env.DEV })]);

const client = new ApolloClient({
  cache: InMemoryCache(),
  link: link,
});

export { client, link, errorLink };
