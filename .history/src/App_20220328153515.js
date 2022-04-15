import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { link, client, errorLink } from "./graphql/index.js";
import { ApolloProvider } from "@apollo/client";

class App extends Component {
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <Navbar />
          <div>Hello from class component</div>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
