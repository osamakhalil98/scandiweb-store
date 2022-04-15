import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import { ApolloProvider } from "react-apollo";

class App extends Component {
  symbol = "";
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <Navbar />
        </ApolloProvider>
      </>
    );
  }
}

export default App;
