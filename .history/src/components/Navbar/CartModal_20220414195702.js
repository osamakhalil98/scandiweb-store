import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./CartModal.module.scss";
import increaseCurrentItemsAction from "../../redux/actions/increaseCurrentItemsAction";

class CartModal extends Component {
  AMOUNT = "";

  statw = {
    total: 0,
  };
  handleCurrency = (pPrices) => {
    pPrices?.map((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = pPrice.amount;
        return this.AMOUNT;
      } else {
        return;
      }
    });
  };

  handleIncrease = (payload) => {
    this.props.increaseCurrentItemsAction(payload);
  };
  render() {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalSubContainer}>
          <p style={{ fontWeight: 500, fontSize: "16px" }}>
            <span style={{ fontWeight: 700, fontSize: "16px" }}> My Bag</span>,{" "}
            {this.props.currentCartItemsState.cartItems.length} items
          </p>

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
            console.log(cartItem);
            this.handleCurrency(item.productPrice);
            item.productPrice.map((price) => {
              if (
                price.currency.symbol ==
                this.props.currentCurrencyState.currentCurrency
              ) {
                this.setState((prevState) => ({
                  total: prevState + price.amount * (item.count - 1),
                }));
              }
            });

            return (
              <>
                <div className={styles.itemContainer}>
                  <div className={styles.itemInfo} style={{ width: "120px" }}>
                    <p>{item.productBrand}</p>
                    <p style={{ marginTop: "0" }}>{item.productName}</p>
                    <p
                      style={{
                        marginTop: "0",
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      {this.props.currentCurrencyState.currentCurrency}{" "}
                      {Math.round(this.state.total * (item.count - 1))}
                    </p>
                  </div>

                  <div className={styles.itemInfo}>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        border: "1px solid #1D1F22",
                        backgroundColor: "white",
                        textAlign: "center",
                        width: 25,
                        height: 25,
                      }}
                      onClick={() => this.handleIncrease(cartItem)}
                    >
                      +
                    </p>
                    <p
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      {item.count - 1}
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        border: "1px solid #1D1F22",
                        backgroundColor: "white",
                        textAlign: "center",
                        width: 25,
                        height: 25,
                      }}
                    >
                      -
                    </p>
                  </div>

                  <div className={styles.itemInfo}>
                    <img
                      src={item.productImage}
                      width={105}
                      height={137}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className={styles.itemInfo}></div>
                </div>
              </>
            );
          })}
        </div>
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "15px",
            marginRight: "15px",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: 700 }}>Total</p>
          <p style={{ fontSize: "18px", fontWeight: 700 }}>
            {this.props.currentCurrencyState.currentCurrency}
            {this.state.total}
          </p>
        </div>
        <div>
          <button>VIEW BAG</button>
          <button>CHECK OUT</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
