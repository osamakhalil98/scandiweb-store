import React, { Component } from "react";
import styles from "./Products.module.css";

export default class Card extends Component {
  render() {
    return (
      <div className={styles.cardConatiner}>
        <img src={this.props.productImage} />
      </div>
    );
  }
}
