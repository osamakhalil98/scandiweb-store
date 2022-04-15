import React, { Component, createRef } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import CurrencyContext from "../../context/currencyContext";
import { GET_CURRENCIES } from "../../graphql/queries";

export default class Modal extends Component {
  static contextType = CurrencyContext;

  modalRef = React.createRef();
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

  handleModal() {
    this.modalRef.current.classList.add(styles.modalClose);
  }

  handleModalClick(c) {
    // const { setCurrency, closeCurrencyModal } = this.context;
    setCurrency(c);
    closeCurrencyModal();
  }
  render() {
    console.log(this.context);
    return (
      <>
        <div className={styles.modalCurrencyContainer} ref={this.modalRef}>
          <Query query={GET_CURRENCIES}>
            {({ data }) => {
              if (data) {
                return (
                  <>
                    {data.currencies.map((c, idx) => {
                      let currencySign = this.currencyType(c.symbol);
                      return (
                        <p
                          key={idx}
                          className={styles.currencyListItem}
                          style={{ cursor: "pointer" }}
                          onClick={() => this.handleModalClick(c.symbol)}
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
          </Query>
        </div>
      </>
    );
  }
}
