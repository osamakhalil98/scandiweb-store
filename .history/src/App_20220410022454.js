import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import { ApolloProvider } from "react-apollo";
import { CurrencyContextProvider } from "./context/currencyContext";

class App extends Component {
  render() {
    return (
      <>
        <CurrencyContextProvider>
          <ApolloProvider client={client}>
            <Navbar />
            <Products />
          </ApolloProvider>
        </CurrencyContextProvider>
      </>
    );
  }
}

export default App;
