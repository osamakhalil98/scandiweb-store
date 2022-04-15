import React, { Component } from "react";

const CurrencyContext = React.createContext();

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    Currency: "$",
    setCurrency: () => {},
  };

  // Method to update state
  setCurrency = (currency) => this.setState({ currency: currency });

  render() {
    const { children } = this.props;
    const { Currency } = this.state;
    const setCurrency = this.setCurrency;

    return (
      <CurrencyContext.Provider value={{ Currency, setCurrency }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContextProvider };
export default CurrencyContext;
