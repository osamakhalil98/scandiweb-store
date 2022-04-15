import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

export default App;
