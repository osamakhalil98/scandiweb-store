import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import { ApolloProvider } from "react-apollo";
import CurrencyContext from "./context/currencyContext";

class App extends Component {
  symbol = "";
  render() {
    return (
      <>
        <CurrencyContext.Provider value={"hi"}>
          <ApolloProvider client={client}>
            <Navbar />
            <Products />
          </ApolloProvider>
        </CurrencyContext.Provider>
      </>
    );
  }
}

export default App;
