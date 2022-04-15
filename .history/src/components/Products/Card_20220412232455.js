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
        this.clickedItems = this.clickedItems.slice(0, 2);
        console.log(this.clickedItems);
      }
    } else {
      this.clickedItems.forEach((item, index) => {
        console.log(this.clickedItems[idx]);
        if (item.getAttribute("data-item") === `${idx}`) {
          console.log("hi");
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
  render() {
    return (
      <div
        className={`${styles.cardContainer} ${
          this.props.stock ? "" : styles.outStock
        }`}
        style={{ marginBottom: 20 }}
      >
        <Link
          to={`/PDP/${this.props.productId}`}
          style={{ textDecoration: "none" }}
        >
          <div className={styles.picBtnConatiner}>
            <img
              className={`${styles.productImage} `}
              src={this.props.productImage}
              height={280}
              width={280}
            />
            <button
              className={styles.cartButtonConatiner}
              onClick={() => alert("hi")}
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
        </Link>
        <h4 className={styles.productName}>
          <span>{this.props.productBrand}</span> {this.props.productName}
        </h4>
        <p className={styles.productPrice}>{this.props.productPrice}</p>

        <div className={styles.attrContainer}>
          {/* attributes handler */}

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
                        onClick={() => this.handleAttrSelect(product.type)}
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
                        onClick={() => this.handleAttrSelect(product.name, idx)}
                        data-item={idx}
                        ref={(ref) => this.clickedItems.push(ref)}
                      >
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "400",
                            marginTop: "10px",
                            fontFamily: "Source Sans Pro",
                          }}
                          className={styles.attrValue}
                        >
                          {value.value}
                        </p>
                      </p>
                    ))}
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    );
  }
}
