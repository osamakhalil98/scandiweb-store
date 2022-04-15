import React, { Component } from "react";
import styles from "./Products.module.css";

export default class Card extends Component {
  render() {
    return (
      <div className={styles.cardContainer} style={{ marginBottom: 20 }}>
        <img
          src={this.props.productImage}
          height={330}
          width={400}
          style={{ objectFit: "contain", marginLeft: 0 }}
        />
        <h4 className={styles.productName}>{this.props.productName}</h4>
        <p className={styles.productPrice}>$50</p>
      </div>
    );
  }
}
