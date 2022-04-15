import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import { ApolloProvider } from "react-apollo";
import { CurrencyContextProvider } from "./context/currencyContext";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Provider store={configureStore()}>
            <CurrencyContextProvider>
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
            </CurrencyContextProvider>
          </Provider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
