import React, { Component } from "react";
import styles from "./Cart.module.scss";

export default class Cart extends Component {
  render() {
    return (
      <div className={styles.cartContainer}>
        <h1>CART</h1>
      </div>
    );
  }
}