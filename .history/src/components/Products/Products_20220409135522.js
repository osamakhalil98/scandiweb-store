import React, { Component } from "react";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Products extends Component {
  render() {
    return <div className={styles.ProductsContainer}>Category Name</div>;
  }
}
