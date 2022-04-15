import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import CurrencyContext from "../../context/currencyContext";
import { GET_CURRENCIES } from "../../graphql/queries";

export default class Modal extends Component {
  static contextType = CurrencyContext;

  currencyType = (cSymbol) => {
    switch (cSymbol) {
      case "$":
        return <span style={{ marginLeft: "5px" }}>USD</span>;
      case "¥":
        return <span style={{ marginLeft: "5px" }}>JPY</span>;

      case "£":
        return <span style={{ marginLeft: "5px" }}>GBP</span>;

      case "₽":
        return <span style={{ marginLeft: "5px" }}>RUB</span>;

      case "A$":
        return <span style={{ marginLeft: "5px" }}>AUD</span>;
      default:
        return "";
    }
  };

  handleCurrency = (symbol) => {
    const { setCurrency } = CurrencyContext;

    setCurrency(symbol);
  };
  render() {
    return (
      <>
        <div className={styles.modalCurrencyContainer}>
          <Query query={GET_CURRENCIES}>
            {({ data }) => {
              if (data) {
                return (
                  <>
                    {data.currencies.map((currency, idx) => {
                      let currencySign = this.currencyType(currency.symbol);
                      return (
                        <p
                          key={idx}
                          className={styles.currencyListItem}
                          onClick={() => this.handleCurrency(currency.symbol)}
                        >
                          {currency.symbol} {currencySign}
                        </p>
                      );
                    })}
                  </>
                );
              } else {
                return null;
              }
            }}
          </Query>
        </div>
      </>
    );
  }
}
