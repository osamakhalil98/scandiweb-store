import React, { Component } from "react";
import { connect } from "react-redux";

class CartModal extends Component {
  render() {
    return <div>CartModal</div>;
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
