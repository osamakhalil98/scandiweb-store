import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartModal.module.scss";

class CartModal extends Component {
  render() {
    return (
      <div className={styles.modalContainer}>
        <span>
          My Bag, {this.props.currentCartItemsState.cartItems.length} items
        </span>
        {console.log(this.props.currentCartItemsState.cartItems)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);