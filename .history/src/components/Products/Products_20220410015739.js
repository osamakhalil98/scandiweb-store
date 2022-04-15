import React, { Component } from "react";
import Grid from "./Grid";
import styles from "./Products.module.scss";
import CategoryContext from "../../context/categoryContext";

export default class Products extends Component {
  static contextType = CategoryContext;
  render() {
    return <Grid />;
  }
}
