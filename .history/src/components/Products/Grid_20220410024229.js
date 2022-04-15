import React, { Component } from "react";
import {
  GET_ALL_PRODUCTS,
  GET_TECH_PRODUCTS,
  GET_CLOTHES_PRODUCTS,
} from "../../graphql/queries";
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
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
        return this.AMOUNT;
      } else {
        return;
      }
    });
  };
  getProducts = async (category) => {
    if (category == "all") {
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
    } else if (category == "tech") {
      await fetch(`${process.env.REACT_APP_DEV_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: GET_TECH_PRODUCTS,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            allProducts: data,
          })
        );
    } else if (category == "clothes") {
      await fetch(`${process.env.REACT_APP_DEV_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: GET_CLOTHES_PRODUCTS,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            allProducts: data,
          })
        );
    }
  };
  componentDidMount() {
    const { category } = this.props;
    getProducts(category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getProducts();
    }
  }
  render() {
    const { allProducts } = this.state;

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
