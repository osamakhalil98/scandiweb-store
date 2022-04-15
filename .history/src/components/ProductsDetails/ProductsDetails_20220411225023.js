import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";

class ProductsDetails extends Component {
  componentDidMount() {
    const productid = this.props.params?.match?.productid;
    console.log(productid);
  }
  render() {
    return (
      <div className={styles.productsDetailsConatiner}>
        Hi from ProductsDetails
      </div>
    );
  }
}

export default ProductsDetails;
