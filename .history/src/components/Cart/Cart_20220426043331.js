import React, { Component } from "react";
import styles from "./Cart.module.scss";
import { connect } from "react-redux";
import increaseCurrentItemsAction from "../../redux/actions/increaseCurrentItemsAction";
import decreaseCurrentItemsAction from "../../redux/actions/decreaseCurrentItemsAction";
import clearCurrentItemsAction from "../../redux/actions/clearCurrentItemsAction";
import leftArrow from "../../assets/leftArrow.png";
import rightArrow from "../../assets/rightArrow.png";

class Cart extends Component {
  AMOUNT = "";
  TOTAL = 0;
  itemsTotal = new Array(
    this.props.currentCartItemsState.cartItems.length
  ).fill(0);
  state = {
    index: 0,
    indexProducts: new Array(
      this.props.currentCartItemsState.cartItems.length
    ).fill(0),
    //same size as array cart
  };

  moveImage = (type, length, idx) => {
    if (length === 1) {
      return;
    }
    let idxproducts = this.state.indexProducts;

    if (type === "plus") {
      if (idxproducts[idx] === length - 1) {
        idxproducts[idx] = 0;
        this.setState({
          indexProducts: idxproducts,
        });
      } else {
        idxproducts[idx] = idxproducts[idx] + 1;
        this.setState({
          indexProducts: idxproducts,
        });
      }
    }
    if (type === "minus") {
      if (idxproducts[idx] === 0) {
        idxproducts[idx] = length - 1;
        this.setState({
          indexProducts: idxproducts,
        });
      } else {
        idxproducts[idx] = idxproducts[idx] - 1;
        this.setState({
          indexProducts: idxproducts,
        });
      }
    }
  };
  handleCurrency = (pPrices, count, idx) => {
    pPrices?.forEach((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = pPrice.amount;
        this.itemsTotal[idx] = Math.round(this.AMOUNT * count);
        this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
      }
    });
  };

  handleIncrease = (payload) => {
    this.props.increaseCurrentItemsAction(payload);
  };
  handleOrder = (payload) => {
    alert("You Order Number is #" + Math.floor(Math.random() * (6 - 1)) + 1);
    this.props.clearCurrentItemsAction(payload);
  };
  handleDecrease = (payload, count, idx) => {
    if (count === 1) {
      this.itemsTotal = this.itemsTotal.filter((item, id) => id !== idx);
      if (this.itemsTotal.length > 0) {
        this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
      } else {
        this.TOTAL = 0;
      }
      let arr = [...this.state.indexProducts];
      arr = arr.filter((item, id) => id !== idx);
      this.setState({
        indexProducts: [...arr],
      });
    }
    this.props.decreaseCurrentItemsAction(payload);
  };

  render() {
    return (
      <div className={styles.cartContainer}>
        <h1 className={`${styles.cartHeadline} ${styles.cartName}`}>CART</h1>
        {this.props.currentCartItemsState.cartItems.length === 0 ? (
          <h1>No Items added to Cart!</h1>
        ) : (
          ""
        )}
        <div>
          {this.props.currentCartItemsState.cartItems.map((item, idx) => {
            const {
              productImage,
              productBrand,
              productName,
              productPrice,
              count,
              prodAttrs,
              selectedAttr,
              productId,
            } = item;
            const cartItem = {
              productImage,
              productBrand,
              productName,
              productPrice,
              selectedAttr,
              count,
              prodAttrs,
              productId,
            };

            this.handleCurrency(item.productPrice, item.count, idx);

            return (
              <>
                <hr className={styles.line} />
                <div className={styles.itemContainer}>
                  <div
                    className={`${styles.itemInfo} ${styles.itemInfoContainer}`}
                  >
                    <p className={styles.pBrand}>{item.productBrand}</p>
                    <p className={`${styles.pName} ${styles.productName}`}>
                      {item.productName}
                    </p>
                    <p className={styles.pPrice}>
                      {this.props.currentCurrencyState.currentCurrency}{" "}
                      {Math.round(this.AMOUNT).toFixed(2)}
                    </p>
                    <div className={`${styles.attrContainer}`}>
                      {item.prodAttrs.length > 0
                        ? item.prodAttrs.map((key, index) => (
                            <>
                              <div className={styles.attrCartContainer}>
                                <p className={styles.attrLabel}>{key.name}:</p>
                                <div className={styles.attrItemsContainer}>
                                  {key.items.map((it) => {
                                    return key.name === "Color" ? (
                                      it.value ===
                                      item.selectedAttr[key.name] ? (
                                        <p
                                          style={{
                                            backgroundColor: it.value,
                                          }}
                                          className={styles.selectedAttrColor}
                                        ></p>
                                      ) : (
                                        <p
                                          style={{
                                            backgroundColor: it.value,
                                          }}
                                          className={styles.AttrColor}
                                        ></p>
                                      )
                                    ) : it.value ===
                                      item.selectedAttr[key.name] ? (
                                      <p className={styles.selectedAttrText}>
                                        {it.value}
                                      </p>
                                    ) : (
                                      <p className={styles.AttrText}>
                                        {it.value}
                                      </p>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          ))
                        : ""}
                    </div>
                  </div>

                  <div className={styles.itemInfoImg}>
                    <div className={styles.infoCtrlContainer}>
                      <p
                        className={styles.increaseCtrl}
                        onClick={() => this.handleIncrease(cartItem)}
                      >
                        <span className={styles.font}> +</span>
                      </p>
                      <p className={styles.itemCount}>
                        <span className={styles.num}> {item.count}</span>
                      </p>
                      <p
                        className={styles.itemDecrease}
                        onClick={() =>
                          this.handleDecrease(cartItem, item.count, idx)
                        }
                      >
                        <span className={styles.font}> -</span>
                      </p>
                    </div>
                    <div className={styles.p}>
                      {item.gallery.length > 1 ? (
                        <div
                          className={styles.arrowContainerLeft}
                          onClick={() =>
                            this.moveImage("plus", item.gallery.length, idx)
                          }
                        >
                          <img
                            src={leftArrow}
                            alt="left arrow"
                            className={`${styles.leftArrow} ${styles.cursor}`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      <div className={styles.imgContainer}>
                        <img
                          alt="current pic"
                          src={item.gallery[this.state.indexProducts[idx]]}
                          className={styles.productImage}
                        />
                      </div>
                      {item.gallery.length > 1 ? (
                        <div
                          className={styles.arrowContainerRight}
                          onClick={() =>
                            this.moveImage("minus", item.gallery.length, idx)
                          }
                        >
                          <img
                            src={rightArrow}
                            alt="right arrow icon"
                            className={`${styles.rightArrow} ${styles.cursor}`}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={styles.itemInfo}></div>
                </div>
              </>
            );
          })}
          {this.props.currentCartItemsState.cartItems.length > 0 ? (
            <>
              {" "}
              <hr className={styles.line} />
              <div className={styles.checkoutContainer}>
                <div className={styles.propContainer}>
                  <span className={styles.propName}>Tax:</span>
                  <span className={styles.propValue}>
                    {this.props.currentCurrencyState.currentCurrency}
                    {Math.round((5 / 100) * this.TOTAL).toFixed(2)}
                  </span>
                </div>
                <div className={styles.propContainer}>
                  <span className={styles.propName}>Qty:</span>
                  <span className={styles.propValue}>
                    {this.props.currentCartItemsState.itemslength}
                  </span>
                </div>
                <div className={styles.propContainer}>
                  <span className={styles.propName}>Total:</span>
                  <span className={styles.propValue}>
                    {" "}
                    {this.props.currentCurrencyState.currentCurrency}
                    {this.TOTAL.toFixed(2)}
                  </span>
                </div>
                <div>
                  <button
                    className={`${styles.cartButton}`}
                    onClick={(payload) => this.handleOrder(payload)}
                  >
                    ORDER
                  </button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
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
  clearCurrentItemsAction: (payload) =>
    dispatch(clearCurrentItemsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
