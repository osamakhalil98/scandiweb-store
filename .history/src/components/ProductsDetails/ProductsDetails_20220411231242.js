import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";
import { GET_PRODUCT } from "../../graphql/queries";

class ProductsDetails extends Component {
  state = {
    productData: [],
  };

  getProduct = async (prodcutId) => {
    await fetch(`${process.env.REACT_APP_DEV_URL}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCT,
        variables: {
          id: prodcutId,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          productData: data,
        })
      );
  };
  componentDidMount() {
    const productid = this.props?.params?.match?.productid;
    console.log(typeof productid);
    this.getProduct(productid);
    console.log(this.state.productData);
  }
  render() {
    return <div className={styles.productsDetailsConatiner}>Hi from</div>;
  }
}

export default ProductsDetails;
