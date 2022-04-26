import React, { Component } from "react";
import { connect } from "react-redux";
import increaseCurrentItemsAction from "../../redux/actions/increaseCurrentItemsAction";
import decreaseCurrentItemsAction from "../../redux/actions/decreaseCurrentItemsAction";
import clearCurrentItemsAction from "../../redux/actions/clearCurrentItemsAction";
import styles from "./CartModal.module.scss";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class CartModal extends Component {
  AMOUNT = "";
  TOTAL = 0;

  itemsTotal = new Array(
    this.props.currentCartItemsState.cartItems.length
  ).fill(0);

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
  handleDecrease = (payload, count, idx) => {
    if (count === 1) {
      this.itemsTotal = this.itemsTotal.filter((item, id) => id !== idx);
      if (this.itemsTotal.length > 0) {
        this.TOTAL = Object.values(this.itemsTotal).reduce((a, b) => a + b);
      } else {
        this.TOTAL = 0;
      }
    }
    this.props.decreaseCurrentItemsAction(payload);
  };

  handleCheckout = () => {
    if (this.props.currentCartItemsState.itemslength === 0) {
      alert("No items added to your cart!");
    } else {
      this.props.history.push("/Cart");
      this.props.closeModal();
    }
  };
  render() {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalSubContainer}>
          <p className={styles.titleBag}>
            <span className={styles.titleBag2}> My Bag</span>,{" "}
            {this.props.currentCartItemsState.itemslength} items
          </p>

          {this.props.currentCartItemsState.cartItems.map((item, idx) => {
            const {
              productImage,
              productBrand,
              productName,
              productPrice,
              gallery,
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
              gallery,
              count,
              prodAttrs,
              productId,
            };

            this.handleCurrency(
              item.productPrice,
              item.count,

              idx
            );

            return (
              <>
                <div className={styles.itemContainer}>
                  <div className={`${styles.itemInfo} ${styles.w}`}>
                    <p>{item.productBrand}</p>
                    <p className={styles.m}>{item.productName}</p>
                    <p className={styles.itemPrice}>
                      {this.props.currentCurrencyState.currentCurrency}{" "}
                      {Math.round(this.AMOUNT).toFixed(2)}
                    </p>

                    {item.prodAttrs.length > 0
                      ? item.prodAttrs.map((key, index) => (
                          <>
                            <div className={styles.prodAttrContainer}>
                              <p className={styles.attrName}>{key.name}:</p>
                              <div className={styles.attrItemsContainer}>
                                {key.items.map((it) => {
                                  return key.name === "Color" ? (
                                    it.value === item.selectedAttr[key.name] ? (
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

                  <div className={`${styles.infoCtrl}`}>
                    <p
                      className={styles.increaseCtrl}
                      onClick={() => this.handleIncrease(cartItem)}
                    >
                      +
                    </p>
                    <p className={styles.itemCount}>{item.count}</p>
                    <p
                      className={styles.itemDecrease}
                      onClick={() =>
                        this.handleDecrease(cartItem, item.count, idx)
                      }
                    >
                      -
                    </p>
                  </div>

                  <div className={styles.itemInfo}>
                    <img
                      src={item.productImage}
                      alt="product"
                      className={styles.productImage}
                      //style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className={styles.itemInfo}></div>
                </div>
              </>
            );
          })}
        </div>
        <div className={styles.totalContainer}>
          <p className={styles.titleBag2}>Total</p>
          <p className={styles.titleBag2}>
            {this.props.currentCurrencyState.currentCurrency}
            {this.TOTAL.toFixed(2)}
          </p>
        </div>
        <div className={styles.btnContainer}>
          <Link to={"/Cart"}>
            <button
              className={`${styles.bagViewBtn} ${styles.cursor}`}
              onClick={() => this.props.closeModal()}
            >
              VIEW BAG
            </button>
          </Link>
          <button
            className={`${styles.checkOutBtn} ${styles.cursor}`}
            onClick={() => this.handleCheckout()}
          >
            CHECK OUT
          </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartModal));
