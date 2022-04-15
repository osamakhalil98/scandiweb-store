import React, { Component } from "react";
import styles from "./Products.module.css";

export default class Card extends Component {
  render() {
    return (
      <div className={styles.cardConatiner}>
        <img
          src={this.props.productImage}
          height={330}
          width={300}
          style={{ objectFit: "cover" }}
        />
        <h4>{this.props.productName}</h4>
      </div>
    );
  }
}