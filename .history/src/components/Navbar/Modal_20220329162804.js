import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import { GET_CURRENCIES } from "../../graphql/queries";

export default class Modal extends Component {
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
                      {
                        console.log(currency);
                      }
                      <p key={idx}>{currency.symbol}</p>;
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
