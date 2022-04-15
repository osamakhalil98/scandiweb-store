import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Grid extends Component {
  componentDidMount() {
    const getAllProducts = async () => {
      const products = await fetch(GET_ALL_PRODUCTS);
      console.log(products.json());
    };
  }
  render() {
    return <div className={styles.gridConatiner}></div>;
  }
}
