import React, { Component } from "react";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import Card from "./Card";
import styles from "./Products.module.scss";
import CurrencyContext from "../../context/currencyContext";

export default class Grid extends Component {
  state = {
    allProducts: {},
  };

  static contextType = CurrencyContext;
  AMOUNT = "";

  handleCurrency = (pPrices) => {
    const { currency } = this.context;
    pPrices?.map((pPrice) => {
      if (pPrice?.currency?.symbol === currency) {
        console.log(pPrice.amount);
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
        return this.AMOUNT;
      } else {
        return;
      }
    });
  };

  componentDidMount() {
    const getAllProducts = async () => {
      await fetch(`${process.env.REACT_APP_DEV_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: GET_ALL_PRODUCTS,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            allProducts: data,
          })
        );
    };
    getAllProducts();
  }
  render() {
    const { allProducts } = this.state;
    console.log(allProducts);

    return (
      <>
        <div className={styles.ProductsContainer}>
          <h4 className={styles.categoryName}>
            {allProducts?.data?.category?.name}
          </h4>
          <div className={styles.gridContainer}>
            {allProducts?.data?.category?.products?.map((product) => {
              this.handleCurrency(product?.prices);
              return (
                <Card
                  productImage={product?.gallery[0]}
                  productName={product.name}
                  productPrice={this.AMOUNT}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
