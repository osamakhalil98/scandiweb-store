import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import client from "./graphql/index.js";
import { ApolloProvider } from "react-apollo";
import CurrencyContext from "./context/currencyContext";

class App extends Component {
  render() {
    return (
      <>
        <CurrencyContext.Provider value={"kp"}>
          <ApolloProvider client={client}>
            <Navbar />
          </ApolloProvider>
        </CurrencyContext.Provider>
      </>
    );
  }
}

export default App;
