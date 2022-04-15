import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import { ApolloProvider } from "react-apollo";
import CurrencyContext from "./context/currencyContext";

class App extends Component {
  symbol = "";
  render() {
    return (
      <>
        <CurrencyContext.Provider value={this.symbol}>
          <ApolloProvider client={client}>
            <Navbar />
          </ApolloProvider>
        </CurrencyContext.Provider>
      </>
    );
  }
}

export default App;
