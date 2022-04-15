import React, { Component } from "react";
import Grid from "./Grid";
import styles from "./Products.module.css";

export default class Products extends Component {
  render() {
    return (
      <div className={styles.ProductsContainer}>
        <h4 className={styles.categoryName}>ALL</h4>
        <Grid />
      </div>
    );
  }
}
