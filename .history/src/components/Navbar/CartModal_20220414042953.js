import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartModal.module.scss";

class CartModal extends Component {
  render() {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalSubContainer}>
          <p>
            <span style={{ fontWeight: "bolder" }}> My Bag</span>,{" "}
            {this.props.currentCartItemsState.cartItems.length} items
          </p>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
