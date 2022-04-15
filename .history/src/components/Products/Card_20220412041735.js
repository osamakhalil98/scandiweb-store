import React, { Component } from "react";
import styles from "./Products.module.scss";
import CurrencyContext from "../../context/currencyContext";
import whiteCart from "../../assets/whiteCart.png";
import whiteWheel from "../../assets/whiteWheel.png";
import { Link } from "react-router-dom";

export default class Card extends Component {
  static contextType = CurrencyContext;
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
          <img
            className={`${styles.productImage} `}
            src={this.props.productImage}
            height={280}
            width={280}
          />
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
        <div className={styles.attrContainer}>
          {console.log(this.props.prodAttrs)}
          {this.props.prodAttrs[0]?.type === "swatch"
            ? this.props.prodAttrs[0]?.items?.map((color, idx) => {
                return (
                  <p
                    style={{
                      backgroundColor: color.value,
                      width: 40,
                      height: 40,
                      marginInlineEnd: 10,
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                  ></p>
                );
              })
            : this.props.prodAttrs[0]?.items?.map((value, idx) => {
                return (
                  <p
                    style={{
                      width: 50,
                      height: 45,
                      marginInlineEnd: 10,
                      border: "1px solid black",
                      cursor: "pointer",
                    }}
                  >
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: "400",
                        marginTop: "10px",
                        fontFamily: "Source Sans Pro",
                      }}
                    >
                      {value.value}
                    </p>
                  </p>
                );
              })}
        </div>
      </div>
    );
  }
}
