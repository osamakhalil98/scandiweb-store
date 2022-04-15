import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import { ApolloProvider } from "react-apollo";
import { CurrencyContextProvider } from "./context/currencyContext";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <CurrencyContextProvider>
            <ApolloProvider client={client}>
              <Navbar />
              <Switch>
                <Route exact path="/">
                  <Products />
                </Route>
                <Route path="/PDP">
                  <ProductsDetails />
                </Route>
              </Switch>
            </ApolloProvider>
          </CurrencyContextProvider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
