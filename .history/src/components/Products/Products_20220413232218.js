import React, { Component } from "react";
import Grid from "./Grid";
import CurrencyContext from "../../context/currencyContext";
import setCategoryAction from "../../redux/actions/setCategoryAction";

class Products extends Component {
  static contextType = CurrencyContext;

  render() {
    return <Grid category={this.props.currentCategoryState.currentCategory} />;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default mapStateToProps(Products);
