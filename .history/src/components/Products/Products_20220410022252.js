import React, { Component } from "react";
import Grid from "./Grid";
import styles from "./Products.module.scss";
import CurrencyContext from "../../context/currencyContext";

export default class Products extends Component {
  static contextType = CurrencyContext;

  render() {
    const { category } = this.context;
    console.log(category);
    return <Grid />;
  }
}
