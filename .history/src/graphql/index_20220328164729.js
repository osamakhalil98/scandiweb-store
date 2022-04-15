import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.DEV_URL,
});

export default client;
