import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";
import { withRouter } from "react-router";

class ProductsDetails extends Component {
  render() {
    return (
      <div className={styles.productsDetailsConatiner}>
        Hi from ProductsDetails
      </div>
    );
  }
}

export default withRouter(ProductsDetails);
