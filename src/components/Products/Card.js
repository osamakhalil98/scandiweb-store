import React, { Component } from "react";
import styles from "./Products.module.scss";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import setCartItemsAction from "../../redux/actions/setCartItemsAction";

class Card extends Component {
  AMOUNT = "";
  state = {
    itemAttributes: [],
    cartItem: {},
  };
  handleCurrency = (pPrices) => {
    pPrices?.forEach((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
        return this.AMOUNT;
      }
    });
  };

  clickedItems = [];

  addItem = (e) => {
    if (this.props.prodAttrs.length === 0 && this.props.stock) {
      const {
        productImage,
        productName,
        productBrand,
        productPrice,
        productId,
        prodAttrs,
        gallery,
        stock,
      } = this.props;
      const cartItem = {
        productImage,
        productName,
        productBrand,
        productPrice,
        selectedAttr: {},
        gallery,
        productId,
        prodAttrs,
        length: 1,
        count: 1,
        stock,
      };
      this.props.setCartItemsAction(cartItem);
      alert("Item added to cart!");
    } else {
      return this.props.history.push(`/PDP/${this.props.productId}`);
    }
  };

  render() {
    this.handleCurrency(this.props.productPrice);
    return (
      <>
        <div
          className={`${styles.cardContainer} ${
            this.props.stock ? "" : styles.outStock
          } ${styles.mb}`}
        >
          <div className={styles.picBtnConatiner}>
            <Link to={`/PDP/${this.props.productId}`} className={styles.td}>
              <img
                className={`${styles.productImage} `}
                src={this.props.productImage}
                alt="product"
                // style={{ objectFit: "contain" }}
              />
            </Link>
            <button
              className={`${styles.cartButtonConatiner} ${styles.borderStyle}`}
              onClick={this.addItem}
              disabled={this.props.stock ? false : true}
            >
              <img src={whiteCart} className={styles.cart} alt="cart body" />
              <div className={styles.wheelsContainer}>
                <img
                  src={whiteWheel}
                  className={styles.mr}
                  alt="cart wheel 1"
                />
                <img src={whiteWheel} alt="cart wheel 2" />
              </div>
            </button>
          </div>
          {this.props.stock ? (
            ""
          ) : (
            <h2 className={styles.outStocktitle}>OUT OF STOCK!</h2>
          )}

          <h4 className={styles.productName}>
            <span>{this.props.productBrand}</span> {this.props.productName}
          </h4>
          <p className={styles.productPrice}>{this.AMOUNT}</p>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setCartItemsAction: (payload) => dispatch(setCartItemsAction(payload)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card));
