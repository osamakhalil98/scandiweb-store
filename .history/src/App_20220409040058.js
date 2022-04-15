import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import { ApolloProvider } from "react-apollo";
import CurrencyContext from "./context/currencyContext";

class App extends Component {
  currencySymbol = "$";
  render() {
    return (
      <>
        <CurrencyContext value={this.currencySymbol}>
          <ApolloProvider client={client}>
            <Navbar />
            <div>Hello from class component</div>
          </ApolloProvider>
        </CurrencyContext>
      </>
    );
  }
}

export default App;
