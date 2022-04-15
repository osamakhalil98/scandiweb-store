import React, { Component } from "react";

const CurrencyContext = React.createContext("$");

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    Currency: "",
  };

  // Method to update state
  setCurrency = (currency) => {
    this.setState((prevState) => ({ currency }));
  };

  render() {
    const { children } = this.props;
    const { currency } = this.state;

    return (
      <CurrencyContext.Provider
        value={{
          currency,
          //this.setCurrency
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContextProvider };
export default CurrencyContext;
