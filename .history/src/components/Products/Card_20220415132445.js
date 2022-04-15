import React, { Component } from "react";
import styles from "./Products.module.scss";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import setCartItemsAction from "../../redux/actions/setCartItemsAction";
import { toast, Toaster } from "react-hot-toast";

class Card extends Component {
  constructor(props) {
    super();
  }

  AMOUNT = "";
  state = {
    itemAttributes: [],
    cartItem: {},
  };
  handleCurrency = (pPrices) => {
    pPrices?.map((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
        return this.AMOUNT;
      } else {
        return;
      }
    });
  };

  clickedItems = [];

  addItem = (e) => {
    if (this.props.prodAttrs.length == 0 && this.props.stock) {
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
        gallery,
        productId,
        prodAttrs,
        count: 1,
        stock,
      };
      this.props.setCartItemsAction(cartItem);
      toast("Item added to cart!", {
        icon: "✔",
      });
    } else {
      return this.props.history.push(`/PDP/${this.props.productId}`);
    }
  };

  render() {
    this.handleCurrency(this.props.productPrice);
    return (
      <>
        <Toaster />
        <div
          className={`${styles.cardContainer} ${
            this.props.stock ? "" : styles.outStock
          }`}
          style={{ marginBottom: 20 }}
        >
          <div className={styles.picBtnConatiner}>
            <Link
              to={`/PDP/${this.props.productId}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className={`${styles.productImage} `}
                src={this.props.productImage}
                height={280}
                width={280}
              />
            </Link>
            <button
              className={styles.cartButtonConatiner}
              onClick={this.addItem}
              style={{ borderStyle: "none" }}
              disabled={this.props.stock ? false : true}
            >
              <img src={whiteCart} className={styles.cart} />
              <div className={styles.wheelsContainer}>
                <img src={whiteWheel} style={{ marginRight: "3px" }} />
                <img src={whiteWheel} />
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
