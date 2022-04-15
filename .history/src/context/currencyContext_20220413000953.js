import React, { Component } from "react";

const CurrencyContext = React.createContext();

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    currency: "$",
    setCurrency: () => {},
    category: "all",
    setCategory: () => {},
    cartitems: [],
    setCartItems: () => {},
  };

  // Method to update state
  setCurrency = (currency) => this.setState({ currency: currency });
  setCategory = (category) => this.setState({ category: category });
  setCartItems = (item) => {
    let arr = this.state.cartitems;
    arr.push(item);
    this.setState({
      cartitems: [...arr],
    });
  };

  render() {
    const { children } = this.props;
    const { currency, category } = this.state;
    const setCurrency = this.setCurrency;
    const setCategory = this.setCategory;

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
