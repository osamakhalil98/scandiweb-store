import React, { Component } from "react";
import Grid from "./Grid";
import { connect } from "react-redux";

class Products extends Component {
  render() {
    return <Grid category={this.props.currentCategoryState.currentCategory} />;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Products);
