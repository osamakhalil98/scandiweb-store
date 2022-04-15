import React, { Component } from "react";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import Card from "./Card";
import styles from "./Products.module.css";

export default class Grid extends Component {
  state = {
    allProducts: {},
  };
  componentDidMount() {
    const getAllProducts = async () => {
      await fetch(`${process.env.REACT_APP_DEV_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: GET_ALL_PRODUCTS,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            allProducts: data,
          })
        );
    };
    getAllProducts();
  }
  render() {
    const { allProducts } = this.state;
    if (allProducts) {
      const x = allProducts?.data?.category?.name;
      console.log("x", x);
    }
    return (
      <>
        <div className={styles.ProductsContainer}>
          <h4 className={styles.categoryName}>ALL</h4>
          <div className={styles.gridConatiner}></div>
        </div>
      </>
    );
  }
}
