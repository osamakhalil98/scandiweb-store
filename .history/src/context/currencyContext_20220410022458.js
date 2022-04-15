import React, { Component } from "react";

const CurrencyContext = React.createContext();

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    currency: "$",
    setCurrency: () => {},
    category: "all",
    setCategory: () => {},
  };

  // Method to update state
  setCurrency = (currency) => this.setState({ currency: currency });
  setCategory = (category) => this.setState({ category: category });

  render() {
    const { children } = this.props;
    const { currency, category, setCategory } = this.state;
    const setCurrency = this.setCurrency;

    return (
      <CurrencyContext.Provider
        value={{ currency, setCurrency, category, setCategory }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContextProvider };
export default CurrencyContext;
