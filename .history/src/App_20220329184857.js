import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import enhanceWithClickOutside from "react-click-outside";
import { ApolloProvider } from "react-apollo";

class App extends Component {
  render() {
    return (
      <>
        <ApolloProvider client={client}>
          <enhanceWithClickOutside>
            <Navbar />
          </enhanceWithClickOutside>
          <div>Hello from class component</div>
        </ApolloProvider>
      </>
    );
  }
}

export default App;
