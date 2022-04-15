import React, { Component } from "react";
import styles from "./Products.module.css";
import CurrencyContext from "../../context/currencyContext";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";

export default class Card extends Component {
  static contextType = CurrencyContext;
  render() {
    return (
      <div className={styles.cardContainer} style={{ marginBottom: 20 }}>
        <img
          className={styles.productImage}
          src={this.props.productImage}
          height={280}
          width={280}
        />
        <h4 className={styles.productName}>{this.props.productName}</h4>
        <p className={styles.productPrice}>{this.props.productPrice}</p>
        <div className={styles.cartButtonConatiner}>
          <img src={whiteCart} />
          <div className={styles.wheelsContainer}>
            <img src={whiteWheel} style={{ marginRight: "3px" }} />
            <img src={whiteWheel} />
          </div>
        </div>
      </div>
    );
  }
}
