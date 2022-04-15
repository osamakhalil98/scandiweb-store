import React, { Component } from "react";
import styles from "./Products.module.scss";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import setCartItemsAction from "../../redux/actions/setCartItemsAction";

class Card extends Component {
  constructor(props) {
    super();
  }

  state = {
    itemAttributes: [],
    cartItem: {},
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
        stock,
      } = this.props;
      const cartItem = {
        productImage,
        productName,
        productBrand,
        productPrice,
        productId,
        prodAttrs,
        stock,
      };
      this.props.setCartItemsAction(cartItem);
    } else {
      return this.props.history.push(`/PDP/${this.props.productId}`);
    }
  };

  render() {
    return (
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
        <p className={styles.productPrice}>{this.props.productPrice}</p>
      </div>
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
