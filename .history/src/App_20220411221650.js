import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import { ApolloProvider } from "react-apollo";
import { CurrencyContextProvider } from "./context/currencyContext";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <CurrencyContextProvider>
            <ApolloProvider client={client}>
              <Routes>
                <Navbar />
                <Products />
              </Routes>
            </ApolloProvider>
          </CurrencyContextProvider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
