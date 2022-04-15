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
        <div>
          {this.props.currentCartItemsState.cartItems.map((item) => {
            console.log(item.productImage);
            return (
              <div>
                <p>{item.productBrand}</p>
                <p>{item.productName}</p>
                <img src={item.productImage} width={40} height={40} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
