import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";
import { GET_PRODUCT } from "../../graphql/queries";

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
  handleGallerySelect = (prod) => {
    this.bigImage = prod;
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
                  style={{
                    objectFit: "contain",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleGallerySelect(prod)}
                />
              );
            })}
          </div>
          <div>
            <img
              src={this.bigImage}
              width={580}
              height={480}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className={styles.productDetailsInfo}>
            <h3 className={styles.brandName}>{product?.brand}</h3>
            <p className={styles.productName}>{product?.name}</p>
            <div className={styles.attrContainer}>
              {product?.attributes[0]?.type === "swatch"
                ? product?.attributes[0]?.items?.map((color, idx) => {
                    return (
                      <p
                        style={{
                          backgroundColor: color.value,
                          width: 20,
                          height: 20,
                        }}
                      ></p>
                    );
                  })
                : console.log("bye")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}