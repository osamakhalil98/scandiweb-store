import React, { Component } from "react";
import { GET_PRODUCTS } from "../../graphql/queries";
import Card from "./Card";
import styles from "./Products.module.scss";
import { connect } from "react-redux";

class Grid extends Component {
  state = {
    allProducts: {},
  };

  AMOUNT = "";

  handleCurrency = (pPrices) => {
    pPrices?.forEach((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
        return this.AMOUNT;
      }
    });
  };
  getProducts = async (category) => {
    await fetch(`${process.env.REACT_APP_DEV_URL}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCTS,
        variables: { title: category },
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          allProducts: data,
        })
      );
  };
  componentDidMount() {
    const { category } = this.props;
    this.getProducts(category);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.getProducts(this.props.category);
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
            {allProducts?.data?.category?.products?.map((product, idx) => {
              this.handleCurrency(product?.prices);
              return (
                <>
                  <Card
                    productImage={product?.gallery[0]}
                    gallery={product?.gallery}
                    productName={product.name}
                    productBrand={product.brand}
                    productPrice={product.prices}
                    productId={product.id}
                    prodAttrs={product.attributes}
                    stock={product.inStock}
                    key={idx}
                  />
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Grid);
