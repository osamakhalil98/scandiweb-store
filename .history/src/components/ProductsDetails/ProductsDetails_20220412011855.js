import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";
import { GET_PRODUCT } from "../../graphql/queries";
import { withRouter } from "react-router";

export default class ProductsDetails extends Component {
  state = {
    productData: [],
  };

  bigImage = "";
  getProduct = async (prodcutId) => {
    await fetch(`${process.env.REACT_APP_DEV_URL}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: GET_PRODUCT,
        variables: {
          id: prodcutId,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          productData: data.data,
        })
      );
  };
  componentDidMount() {
    const prodcutid = this.props.match.params.productid;
    this.getProduct(prodcutid);
  }
  render() {
    const { product } = this.state.productData;

    return (
      <div className={styles.productsDetailsConatiner}>
        <div className={styles.productDetailSubContainer}>
          <div className={styles.galleryConatiner}>
            {product?.gallery?.map((prod, idx) => {
              if (idx === 0) {
                this.bigImage = prod;
              }
              return (
                <img
                  src={`${prod}`}
                  width={79}
                  height={80}
                  key={idx}
                  style={{ objectFit: "contain", marginBottom: "10px" }}
                />
              );
            })}
          </div>
          <div>
            <img
              src={this.bigImage}
              width={510}
              height={411}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}
