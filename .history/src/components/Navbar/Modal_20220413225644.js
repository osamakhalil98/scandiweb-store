import React, { Component, createRef } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.css";
import CurrencyContext from "../../context/currencyContext";
import { GET_CURRENCIES } from "../../graphql/queries";
import { connect } from "react-redux";
import setCurrencyAction from "../../redux/actions/setCurrencyAction";

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
    const { setCurrency } = this.context;
    //setCurrency(c);
    this.props.setCurrencyAction(c);
    //closeCurrencyModal();
  }
  render() {
    console.log(this.props);
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencyAction: (payload) => dispatch(setCurrencyAction(payload)),
});

//export default connect(mapStateToProps, mapDispatchToProps)(Modal);
