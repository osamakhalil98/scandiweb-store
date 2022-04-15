import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import { ApolloProvider } from "react-apollo";
import { CurrencyContextProvider } from "./context/currencyContext";
import { CategoryContextProvider } from "./context/categoryContext";

class App extends Component {
  render() {
    return (
      <>
        <CategoryContextProvider>
          <CurrencyContextProvider>
            <ApolloProvider client={client}>
              <Navbar />
              <Products />
            </ApolloProvider>
          </CurrencyContextProvider>
        </CategoryContextProvider>
      </>
    );
  }
}

export default App;
