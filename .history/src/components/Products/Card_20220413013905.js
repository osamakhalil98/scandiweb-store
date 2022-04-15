import React, { Component } from "react";
import styles from "./Products.module.scss";
import CurrencyContext from "../../context/currencyContext";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link } from "react-router-dom";

export default class Card extends Component {
  constructor(props) {
    super();
    this.handleAttrSelect = this.handleAttrSelect.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  static contextType = CurrencyContext;

  state = {
    itemAttributes: [],
    cartItem: {},
  };

  clickedItems = [];
  handleAttrSelect = (name, idx) => {
    if (this.clickedItems.length === 6) {
      if (name === "Capacity") {
        let slicedArr = this.clickedItems.slice(0, 2);
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
        console.log(item?.getAttribute("data-item"));
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
      const cartItem = {
        productImage,
        productName,
        productBrand,
        productPrice,
        productId,
        prodAttrs,
        stock,
      };
      this.setState({
        cartItem: cartItem,
      });
      localStorage.setItem("item", JSON.stringify(cartItem));
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

        {/* attributes handler */}

        {this.props.prodAttrs?.length > 0 ? (
          <div className={styles.attrContainer}>
            {this.props.prodAttrs?.map((product, idx) => {
              if (product.type === "swatch") {
                return (
                  <>
                    <h3
                      className={styles.attrName}
                      style={{ marginLeft: "20px", marginBottom: "5px" }}
                    >
                      {product?.name}:
                    </h3>
                    <div style={{ display: "flex", marginLeft: "20px" }}>
                      {product?.items?.map((color, idx) => (
                        <p
                          style={{
                            backgroundColor: color.value,
                            width: 50,
                            height: 45,
                            marginInlineEnd: 10,
                            border: "1px solid black",
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                          onClick={() =>
                            this.handleAttrSelect(product.name, idx)
                          }
                          data-item={idx}
                          ref={(ref) => this.clickedItems.push(ref)}
                        ></p>
                      ))}
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <h3
                      className={styles.attrName}
                      style={{ marginLeft: "20px", marginBottom: "5px" }}
                    >
                      {product?.name}:
                    </h3>
                    <div style={{ display: "flex", marginLeft: "20px" }}>
                      {product?.items?.map((value, idx) => (
                        <p
                          style={{
                            backgroundColor: value.value,
                            width: 50,
                            height: 45,
                            marginInlineEnd: 10,
                            border: "1px solid black",
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                          onClick={() =>
                            this.handleAttrSelect(product.name, idx)
                          }
                          data-item={idx}
                          ref={(ref) => this.clickedItems.push(ref)}
                        >
                          <span
                            style={{
                              textAlign: "center",
                              fontSize: "16px",
                              fontWeight: "400",
                              marginTop: "20px",
                              fontFamily: "Source Sans Pro",
                            }}
                            className={styles.attrValue}
                          >
                            {value.value}
                          </span>
                        </p>
                      ))}
                    </div>
                  </>
                );
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
