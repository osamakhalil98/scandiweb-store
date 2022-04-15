import React, { Component } from "react";
import styles from "./Cart.module.scss";
import { connect } from "react-redux";
import increaseCurrentItemsAction from "../../redux/actions/increaseCurrentItemsAction";
import decreaseCurrentItemsAction from "../../redux/actions/decreaseCurrentItemsAction";

class Cart extends Component {
  AMOUNT = "";
  TOTAL = 0;
  itemsTotal = {};

  handleCurrency = (pPrices, count, name) => {
    pPrices?.map((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = pPrice.amount;
        this.itemsTotal[name] = Math.round(this.AMOUNT * (count - 1));
        this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
      } else {
        return;
      }
    });
  };

  handleIncrease = (payload) => {
    this.props.increaseCurrentItemsAction(payload);
  };
  handleDecrease = (payload, count, name) => {
    if (count == 2) {
      this.itemsTotal[name] = Math.round(this.AMOUNT * 0);
      this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
    }
    this.props.decreaseCurrentItemsAction(payload);
  };

  render() {
    return (
      <div className={styles.cartContainer}>
        <h1 className={styles.cartHeadline}>CART</h1>
        <div>
          {this.props.currentCartItemsState.cartItems.map((item) => {
            const {
              productImage,
              productBrand,
              productName,
              productPrice,
              count,
              prodAttrs,
              productId,
            } = item;
            const cartItem = {
              productImage,
              productBrand,
              productName,
              productPrice,
              count,
              prodAttrs,
              productId,
            };

            this.handleCurrency(
              item.productPrice,
              item.count,
              item.productName
            );

            return (
              <>
                <div className={styles.itemContainer}>
                  <div className={styles.itemInfo} style={{ width: "120px" }}>
                    <p>{item.productBrand}</p>
                    <p style={{ marginTop: "0" }}>{item.productName}</p>
                    <p
                      style={{
                        marginTop: "0",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {this.props.currentCurrencyState.currentCurrency}{" "}
                      {Math.round(this.AMOUNT * (item.count - 1))}
                    </p>
                  </div>

                  <div className={styles.itemInfoImg}>
                    <div style={{ margin: "8px" }}>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: 500,
                          border: "1px solid #1D1F22",
                          backgroundColor: "white",
                          textAlign: "center",
                          width: 35,
                          height: 35,
                          cursor: "pointer",
                        }}
                        onClick={() => this.handleIncrease(cartItem)}
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
                        <span style={{ textAlign: "center" }}>
                          {" "}
                          {item.count - 1}
                        </span>
                      </p>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: 500,
                          border: "1px solid #1D1F22",
                          backgroundColor: "white",
                          textAlign: "center",
                          width: 35,
                          height: 35,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          this.handleDecrease(
                            cartItem,
                            item.count,
                            item.productName
                          )
                        }
                      >
                        -
                      </p>
                    </div>
                    <div>
                      <img src={item.productImage} width={141} height={185} />
                    </div>
                  </div>
                  <div className={styles.itemInfo}></div>
                </div>
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

const mapDispatchToProps = (dispatch) => ({
  increaseCurrentItemsAction: (payload) =>
    dispatch(increaseCurrentItemsAction(payload)),
  decreaseCurrentItemsAction: (payload) =>
    dispatch(decreaseCurrentItemsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
