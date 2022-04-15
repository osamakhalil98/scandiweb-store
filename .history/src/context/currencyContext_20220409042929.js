import React, { Component } from "react";

const CurrencyContext = React.createContext("$");

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    setCurrency: "$",
  };

  // Method to update state
  setCurrency = (currency) => {
    this.setState({ currency });
  };

  render() {
    const { children } = this.props;
    const { currency } = this.state;
    const setCurrency = this.setCurrency;

    return (
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContextProvider };
export default CurrencyContext;