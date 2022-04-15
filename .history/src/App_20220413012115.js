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
        <CurrencyContextProvider>
          <BrowserRouter>
            <ApolloProvider client={client}>
              <Navbar />
              <Switch>
                <Route exact path="/" component={Products} />
                <Route
                  path="/PDP/:productid"
                  render={({ match }) => (
                    <ProductsDetails id={match.params.productid} />
                  )}
                  component={ProductsDetails}
                />
              </Switch>
            </ApolloProvider>
          </BrowserRouter>
        </CurrencyContextProvider>
      </>
    );
  }
}

export default App;
