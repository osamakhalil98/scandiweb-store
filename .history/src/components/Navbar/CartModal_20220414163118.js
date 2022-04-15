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
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
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
            console.log(item.productImage);
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
                    </p>
                  </div>

                  <div className={styles.itemInfo}>
                    <p
                      style={{
                        fontSize: "30px",
                        border: "1px solid #1D1F22",
                        backgroundColor: "white",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        height: "30px",
                        textAlign: "center",
                        paddingBottom: "5px",
                      }}
                    >
                      +
                    </p>
                    <p style={{ marginTop: "0" }}>0</p>
                    <p>-</p>
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
                <p>Total : {this.TOTAL}</p>
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
