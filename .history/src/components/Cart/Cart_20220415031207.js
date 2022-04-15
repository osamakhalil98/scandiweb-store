import React, { Component } from "react";
import styles from "./Cart.module.scss";
import { connect } from "react-redux";
import increaseCurrentItemsAction from "../../redux/actions/increaseCurrentItemsAction";
import decreaseCurrentItemsAction from "../../redux/actions/decreaseCurrentItemsAction";

export default class Cart extends Component {
  render() {
    return (
      <div className={styles.cartContainer}>
        <h1 className={styles.cartHeadline}>CART</h1>
        <div>
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
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    this.handleDecrease(cartItem, item.count, item.productName)
                  }
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
        </div>
      </div>
    );
  }
}
