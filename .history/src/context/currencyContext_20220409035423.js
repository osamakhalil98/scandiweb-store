import React from "react";

const CurrencyContext = React.createContext("$");

class CurrencyContextProvider extends Component {
    // Context state
    state = {
      Currency:""
    }
  
    // Method to update state
    setCurrency = (currency) => {
      this.setState((prevState) => ({ currency}))
    }
  
    render() {
      const { children } = this.props
      const { currency } = this.state
  
  
      return (
        <CurrencyContext.Provider
          value={{
            currency,
            ,
          }}
        >
          {children}
        </CurrencyContext.Provider>
      )
    }
  }
export default CurrencyContext;
