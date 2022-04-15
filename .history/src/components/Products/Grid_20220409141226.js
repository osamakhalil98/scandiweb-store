import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Grid extends Component {
  componentDidMount() {
    getAllProducts = async () => {};
  }
  render() {
    return <div className={styles.gridConatiner}></div>;
  }
}
