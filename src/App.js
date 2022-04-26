import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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
              <Route path="/Cart" component={Cart} />
            </Switch>
          </ApolloProvider>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
