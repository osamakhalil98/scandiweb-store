import React, { Component } from "react";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import Card from "./Card";
import styles from "./Products.module.css";
import CurrencyContext from "../../context/currencyContext";

export default class Grid extends Component {
  state = {
    allProducts: {},
  };

  static contextType = CurrencyContext;

  handleCurrency = (pPrices) => {
    const { currency } = this.context;
    console.log(currency);
    pPrices?.map((pPrice) => {
      console.log("hi");
      if (pPrice?.currency?.symbol == `${currency}`) {
        return `${pPrice?.currency?.symbol} ${pPrice.amount}`;
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
              return (
                <Card
                  productImage={product?.gallery[0]}
                  productName={product.name}
                  productPrice={this.handleCurrency(product?.prices)}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
