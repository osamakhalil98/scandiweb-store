import React, { Component } from "react";
import styles from "./Products.module.scss";
import CurrencyContext from "../../context/currencyContext";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link } from "react-router-dom";

export default class Card extends Component {
  static contextType = CurrencyContext;
  render() {
    return (
      <div className={styles.cardContainer} style={{ marginBottom: 20 }}>
        <Link to={`/PDP`} style={{ textDecoration: "none" }}>
          <img
            className={styles.productImage}
            src={this.props.productImage}
            height={280}
            width={280}
          />
        </Link>
        <h4 className={styles.productName}>{this.props.productName}</h4>
        <p className={styles.productPrice}>{this.props.productPrice}</p>

        <div className={styles.cartButtonConatiner} onClick={() => "5"}>
          <img src={whiteCart} className={styles.cart} />
          <div className={styles.wheelsContainer}>
            <img src={whiteWheel} style={{ marginRight: "3px" }} />
            <img src={whiteWheel} />
          </div>
        </div>
      </div>
    );
  }
}
