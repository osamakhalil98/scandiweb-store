import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import CurrencyContext from "../../context/currencyContext";
import { GET_CURRENCIES } from "../../graphql/queries";

export default class Modal extends Component {
  //static contextType = CurrencyContext;

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

  render() {
    //console.log(this.context);
    // const { c } = this.context;

    return (
      <>
        <div className={styles.modalCurrencyContainer}>
          <CurrencyContext.Consumer>
            {({ setCurrency }) => {
              <Query query={GET_CURRENCIES}>
                {({ data }) => {
                  if (data) {
                    return (
                      <>
                        {data.currencies.map((c, idx) => {
                          let currencySign = this.currencyType(c.symbol);
                          console.log(c);
                          return (
                            <p
                              key={idx}
                              className={styles.currencyListItem}
                              // onClick={() => setCurrency(c.symbol)}
                            >
                              {c.symbol} {currencySign}
                            </p>
                          );
                        })}
                      </>
                    );
                  } else {
                    return null;
                  }
                }}
              </Query>;
            }}
          </CurrencyContext.Consumer>
        </div>
      </>
    );
  }
}
