import React, { Component } from "react";
import { Query } from "react-apollo";
import styles from "./Navbar.module.scss";
import { GET_CURRENCIES } from "../../graphql/queries";
import { connect } from "react-redux";
import setCurrencyAction from "../../redux/actions/setCurrencyAction";

class Modal extends Component {
  handleModalClick(c) {
    this.props.setCurrencyAction(c);
    setTimeout(() => {
      this.props.closed();
    }, 10);
  }
  render() {
    return (
      <>
        <div className={styles.modalCurrencyContainer} ref={this.modalRef}>
          <Query query={GET_CURRENCIES}>
            {({ data }) => {
              if (data) {
                return (
                  <>
                    {data.currencies.map((c, idx) => {
                      return (
                        <p
                          key={idx}
                          className={`${styles.currencyListItem} ${
                            this.props.currentCurrencyState.currentCurrency ===
                            c.symbol
                              ? styles.activeListItem
                              : ""
                          } ${styles.cursor}`}
                          onClick={() => this.handleModalClick(c.symbol)}
                        >
                          <span className={styles.currencyStyle}>
                            {" "}
                            {c.symbol} {c.label}
                          </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
