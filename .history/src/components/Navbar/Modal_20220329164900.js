import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import { GET_CURRENCIES } from "../../graphql/queries";

export default class Modal extends Component {
  currencyType = (cSymbol) => {
    switch (cSymbol) {
      case "$":
        return <span>USD</span>;
      case "¥":
        return <span>JPY</span>;

      case "£":
        return <span>GBP</span>;

      case "₽":
        return <span>RUB</span>;

      case "A$":
        return <span>AUD</span>;
      default:
        return "";
    }
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
                      return (
                        <p key={idx}>
                          {currency.symbol} {() => this.currencyType()}
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
