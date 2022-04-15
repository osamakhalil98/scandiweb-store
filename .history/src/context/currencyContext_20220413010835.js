import React, { Component } from "react";

const CurrencyContext = React.createContext();

class CurrencyContextProvider extends Component {
  // Context state
  state = {
    currency: "$",
    setCurrency: () => {},
    category: "all",
    setCategory: () => {},
    cartItems: [],
    setCartItems: () => {},
  };

  // Method to update state
  setCurrency = (currency) => this.setState({ currency: currency });
  setCategory = (category) => this.setState({ category: category });
  setCartItems = (item) => {
    let arr = this.state.cartItems;
    arr.push(item);
    return this.setState({
      cartItems: [...arr],
    });
  };

  render() {
    const { children } = this.props;
    const { currency, category, cartItems } = this.state;
    const setCurrency = this.setCurrency;
    const setCategory = this.setCategory;
    const setCartItems = this.setCartItems;

    return (
      <CurrencyContext.Provider
        value={{
          currency,
          setCurrency,
          category,
          setCategory,
          cartItems,
          setCartItems,
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  }
}

export { CurrencyContextProvider };
export default CurrencyContext;
