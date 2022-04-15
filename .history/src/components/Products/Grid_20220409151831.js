import React, { Component } from "react";
import { Query } from "react-apollo";
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
    if (allProducts && allProducts.category) {
      const x = allProducts.category;
      console.log("x", x);
    }
    return <div className={styles.gridConatiner}></div>;
  }
}
