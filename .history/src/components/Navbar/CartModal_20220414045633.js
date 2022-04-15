import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartModal.module.scss";

class CartModal extends Component {
  AMOUNT = "";
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
          <div className={styles.itemContainer}>
            {this.props.currentCartItemsState.cartItems.map((item) => {
              console.log(item.productImage);
              this.handleCurrency(item.productPrice);
              return (
                <>
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
                    <p>+</p>
                    <p style={{ marginTop: "0" }}>0</p>
                    <p>-</p>
                  </div>

                  <div className={styles.itemInfo}>
                    <img src={item.productImage} width={50} height={50} />
                  </div>
                </>
              );
            })}
          </div>
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
