import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Grid extends Component {
  componentDidMount() {
    const getAllProducts = async () => {
      const products = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GET_ALL_PRODUCTS,
          variables: {},
        }),
      });
      console.log(products);
    };
    getAllProducts();
  }
  render() {
    return <div className={styles.gridConatiner}></div>;
  }
}