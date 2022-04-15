import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";
import { GET_PRODUCT } from "../../graphql/queries";
import { withRouter } from "react-router";

export default class ProductsDetails extends Component {
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
    const { prodcutid } = this.props.match.params.productid;
    console.log(prodcutid);
    this.getProduct(prodcutid);
  }
  render() {
    return <div className={styles.productsDetailsConatiner}>Hi from</div>;
  }
}
