import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import { GET_CURRENCIES } from "../../graphql/queries";

export default class Modal extends Component {
  render() {
    currencyType = (cSymbol) => {
      switch (cSymbol) {
        case "$":
          return <span>USD</span>;
          break;
        case "¥":
          return <span>JPY</span>;
          break;
        case "£":
          return <span>GBP</span>;
          break;
        case "₽":
          return <span>RUB</span>;
          break;
        case "A$":
          return <span>AUD</span>;
          break;
      }
    };
    return (
      <>
        <div className={styles.modalCurrencyContainer}>
          <Query query={GET_CURRENCIES}>
            {({ data }) => {
              if (data) {
                return (
                  <>
                    {data.currencies.map((currency, idx) => {
                      return <p key={idx}>{currency.symbol}</p>;
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
