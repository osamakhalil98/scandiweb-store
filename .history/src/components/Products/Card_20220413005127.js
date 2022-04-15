import React, { Component } from "react";
import styles from "./Products.module.scss";
import CurrencyContext from "../../context/currencyContext";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link } from "react-router-dom";

export default class Card extends Component {
  static contextType = CurrencyContext;

  state = {
    itemAttributes: [],
  };

  clickedItems = [];
  handleAttrSelect = (name, idx) => {
    if (this.clickedItems.length === 6) {
      if (name === "Capacity") {
        let slicedArr = this.clickedItems.slice(0, 2);
        slicedArr.forEach((item, index) => {
          console.log(item.getAttribute("data-item"));
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      } else if (name === "With USB 3 ports") {
        let slicedArr = this.clickedItems.slice(2, 4);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      } else {
        let slicedArr = this.clickedItems.slice(4, 6);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      }
    } else {
      this.clickedItems.forEach((item, index) => {
        console.log(this.clickedItems[index]);
        if (item.getAttribute("data-item") === `${idx}`) {
          if (item.classList.contains(styles.notSelectedAttr)) {
            item.classList.remove(styles.notSelectedAttr);
            item.classList.add(styles.selectedAttr);
          } else {
            item.classList.toggle(styles.selectedAttr);
          }
        } else {
          item.classList.add(styles.notSelectedAttr);
        }
      });
    }
  };

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
      const item = {
        productImage,
        productName,
        productBrand,
        productPrice,
        productId,
        prodAttrs,
        stock,
      };
      const { setCartItems } = this.context;
      setCartItems(item);
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
            onClick={() => this.addItem()}
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

        {/* attributes handler */}
      </div>
    );
  }
}