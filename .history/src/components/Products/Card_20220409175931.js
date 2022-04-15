import React, { Component } from "react";
import styles from "./Products.module.css";
import CurrencyContext from "../../context/currencyContext";

export default class Card extends Component {
  static contextType = CurrencyContext;
  render() {
    console.log(this.context);
    return (
      <div className={styles.cardContainer} style={{ marginBottom: 20 }}>
        <img
          className={styles.productImage}
          src={this.props.productImage}
          height={280}
          width={280}
        />
        <h4 className={styles.productName}>{this.props.productName}</h4>
        <p className={styles.productPrice}>$50</p>
      </div>
    );
  }
}
