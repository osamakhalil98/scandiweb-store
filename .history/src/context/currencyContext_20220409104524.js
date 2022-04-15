import React, { Component } from "react";

const CurrencyContext = React.createContext("$");

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    currency: "$",
    setCurrency: () => {},
  };

  // Method to update state
  setCurrency = (currency) => this.setState({ currency });

  render() {
    const { children } = this.props;
    const { currency } = this.state;
    const c = this.setCurrency;
    console.log(c);

    return (
      <CurrencyContext.Provider value={{ currency, c }}>
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContextProvider };
export default CurrencyContext;
