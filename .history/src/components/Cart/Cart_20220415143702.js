import React, { Component } from "react";
import styles from "./Cart.module.scss";
import { connect } from "react-redux";
import increaseCurrentItemsAction from "../../redux/actions/increaseCurrentItemsAction";
import decreaseCurrentItemsAction from "../../redux/actions/decreaseCurrentItemsAction";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";

class Cart extends Component {
  AMOUNT = "";
  TOTAL = 0;
  itemsTotal = {};

  state = {
    index: 0,
  };

  sliderImage = (gallery) => {
    let sliderImage = gallery[0];
  };

  moveImage = (type, length, gallery) => {
    moveImage = (type, length, gallery, name) => {
      let idxproducts = this.state.indexProducts
      if(!(name  in idxproducts)){
        idxproducts[name] = 0;
      }
      if (type === "plus") {
       
      }
      if (type === "minus") {
        
    };
  };
  handleCurrency = (pPrices, count, name) => {
    pPrices?.map((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = pPrice.amount;
        this.itemsTotal[name] = Math.round(this.AMOUNT * (count - 1));
        this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
      } else {
        return;
      }
    });
  };

  handleIncrease = (payload) => {
    this.props.increaseCurrentItemsAction(payload);
  };
  handleDecrease = (payload, count, name) => {
    if (count == 2) {
      this.itemsTotal[name] = Math.round(this.AMOUNT * 0);
      this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
    }
    this.props.decreaseCurrentItemsAction(payload);
  };

  render() {
    return (
      <div className={styles.cartContainer}>
        <h1 className={styles.cartHeadline} style={{ marginBottom: "40px" }}>
          CART
        </h1>
        <div>
          {this.props.currentCartItemsState.cartItems.map((item) => {
            const {
              productImage,
              productBrand,
              productName,
              productPrice,
              count,
              prodAttrs,
              productId,
            } = item;
            const cartItem = {
              productImage,
              productBrand,
              productName,
              productPrice,
              count,
              prodAttrs,
              productId,
            };

            this.handleCurrency(
              item.productPrice,
              item.count,
              item.productName
            );

            return (
              <>
                <hr className={styles.line} />
                <div className={styles.itemContainer}>
                  <div
                    className={styles.itemInfo}
                    style={{
                      width: "600px",
                      marginBottom: "30px",
                    }}
                  >
                    <p className={styles.pBrand}>{item.productBrand}</p>
                    <p style={{ marginTop: "0" }} className={styles.pName}>
                      {item.productName}
                    </p>
                    <p className={styles.pPrice}>
                      {this.props.currentCurrencyState.currentCurrency}{" "}
                      {Math.round(this.AMOUNT * (item.count - 1)).toFixed(2)}
                    </p>
                  </div>

                  <div className={styles.itemInfoImg}>
                    <div
                      style={{
                        marginLeft: "8px",
                        marginRight: "8px",
                        marginTop: "0px",
                        height: "200px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignContent: "space-between",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: 500,
                          border: "1px solid #1D1F22",
                          backgroundColor: "white",
                          textAlign: "center",
                          width: 45,
                          paddingTop: 5,
                          paddingBottom: 5,
                          height: 45,
                          cursor: "pointer",
                          marginTop: 4,
                          marginBottom: 15,
                        }}
                        onClick={() => this.handleIncrease(cartItem)}
                      >
                        <span style={{ fontSize: 30 }}> +</span>
                      </p>
                      <p
                        style={{
                          marginTop: 25,
                          marginBottom: 15,

                          fontSize: "18px",
                          textAlign: "center",
                        }}
                      >
                        <span
                          style={{ textAlign: "center" }}
                          className={styles.num}
                        >
                          {" "}
                          {item.count - 1}
                        </span>
                      </p>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: 500,
                          border: "1px solid #1D1F22",
                          backgroundColor: "white",
                          textAlign: "center",
                          width: 45,
                          height: 45,
                          cursor: "pointer",
                          paddingTop: 5,
                          paddingBottom: 5,
                          marginTop: 15,
                        }}
                        onClick={() =>
                          this.handleDecrease(
                            cartItem,
                            item.count,
                            item.productName
                          )
                        }
                      >
                        <span style={{ fontSize: 30 }}> -</span>
                      </p>
                    </div>
                    <div style={{ position: "relative" }}>
                      <img
                        src={leftArrow}
                        className={styles.leftArrow}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          this.moveImage(
                            "plus",
                            item.gallery.length,
                            item.gallery
                          )
                        }
                      />
                      <img
                        src={item.gallery[this.state.index]}
                        width={141}
                        height={185}
                      />
                      <img
                        src={rightArrow}
                        className={styles.rightArrow}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => this.moveImage("minus")}
                      />
                    </div>
                  </div>
                  <div className={styles.itemInfo}></div>
                </div>
              </>
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

const mapDispatchToProps = (dispatch) => ({
  increaseCurrentItemsAction: (payload) =>
    dispatch(increaseCurrentItemsAction(payload)),
  decreaseCurrentItemsAction: (payload) =>
    dispatch(decreaseCurrentItemsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
