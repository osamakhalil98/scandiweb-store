import React from "react";

const CurrencyContext = React.createContext("$");

class CurrencyContextProvider extends Component {
    // Context state
    state = {
      Currency:""
    }
  
    // Method to update state
    setCurrency = (Currency) => {
      this.setState((prevState) => ({ Currency}))
    }
  
    render() {
      const { children } = this.props
      const { Currency } = this.state
  
  
      return (
        <CurrencyContext.Provider
          value={{
            Currency,
            this.setCurrency,
          }}
        >
          {children}
        </CurrencyContext.Provider>
      )
    }
  }
export default CurrencyContext;
