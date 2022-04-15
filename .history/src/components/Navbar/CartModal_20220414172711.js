import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartModal.module.scss";

class CartModal extends Component {
  AMOUNT = "";
  TOTAL = "";
  handleCurrency = (pPrices) => {
    pPrices?.map((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = pPrice.amount;
        return this.AMOUNT;
      } else {
        return;
      }
    });
  };

  render() {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalSubContainer}>
          <p style={{ fontWeight: 500, fontSize: "16px" }}>
            <span style={{ fontWeight: 700, fontSize: "16px" }}> My Bag</span>,{" "}
            {this.props.currentCartItemsState.cartItems.length} items
          </p>

          {this.props.currentCartItemsState.cartItems.map((item) => {
            console.log(item);
            this.handleCurrency(item.productPrice);
            item.productPrice.map((price) => {
              if (
                price.currency.symbol ==
                this.props.currentCurrencyState.currentCurrency
              ) {
                this.TOTAL = Math.round(this.TOTAL + price.amount);
              }
            });

            return (
              <>
                <div className={styles.itemContainer}>
                  <div className={styles.itemInfo}>
                    <p>{item.productBrand}</p>
                    <p style={{ marginTop: "0" }}>{item.productName}</p>
                    <p
                      style={{
                        marginTop: "0",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {this.AMOUNT}
                      {this.props.currentCurrencyState.currentCurrency}
                    </p>
                  </div>

                  <div className={styles.itemInfo}>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        border: "1px solid #1D1F22",
                        backgroundColor: "white",
                        textAlign: "center",
                        width: 25,
                        height: 25,
                      }}
                    >
                      +
                    </p>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      {item.count - 1}
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        border: "1px solid #1D1F22",
                        backgroundColor: "white",
                        textAlign: "center",
                        width: 25,
                        height: 25,
                      }}
                    >
                      -
                    </p>
                  </div>

                  <div className={styles.itemInfo}>
                    <img
                      src={item.productImage}
                      width={105}
                      height={137}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className={styles.itemInfo}></div>
                </div>
              </>
            );
          })}
        </div>
        <p style={{ marginLeft: "15px" }}>
          Total : {this.TOTAL} {this.props.currentCurrencyState.currentCurrency}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
