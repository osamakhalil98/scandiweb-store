import React, { Component } from "react";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Grid extends Component {
  render() {
    return <div className={styles.gridConatiner}></div>;
  }
}
