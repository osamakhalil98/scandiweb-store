import React, { Component } from "react";
import styles from "./ProductsDetails.module.css";
import { GET_PRODUCT } from "../../graphql/queries";
import CurrencyContext from "../../context/currencyContext";

export default class ProductsDetails extends Component {
  state = {
    productData: [],
    selectedAttributes: [],
    mainImage: "",
  };

  bigImage = "";
  static contextType = CurrencyContext;
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
    this.setState({
      mainImage: prod,
    });
  };
  componentDidMount() {
    const prodcutid = this.props.match.params.productid;
    this.getProduct(prodcutid);
  }
  render() {
    const { product } = this.state.productData;
    let description = product?.description;
    description = description?.replace(/['"]+/g, "");

    const { currency } = this.context;
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
              src={this.state.mainImage ? this.state.mainImage : this.bigImage}
              alt="gallery"
              width={580}
              height={480}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div className={styles.productDetailsInfo}>
            <h2 className={styles.brandName}>{product?.brand}</h2>
            <p className={styles.productName}>{product?.name}</p>
            <h3 className={styles.attrName}>{product?.attributes[0]?.name}:</h3>
            <div className={styles.attrContainer}>
              {product?.attributes?.map((product, idx) => {
                console.log(product);
                if (product.type === "swatch") {
                  product?.items?.map((color, idx) => {
                    return (
                      <p
                        style={{
                          backgroundColor: color.value,
                          width: 40,
                          height: 40,
                          marginInlineEnd: 10,
                          border: "1px solid black",
                          cursor: "pointer",
                        }}
                      ></p>
                    );
                  });
                } else {
                  product?.items?.map((value, idx) => {
                    console.log(value);
                    return (
                      <p
                        style={{
                          width: 50,
                          height: 45,
                          marginInlineEnd: 10,
                          border: "1px solid black",
                          cursor: "pointer",
                        }}
                      >
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "16px",
                            fontWeight: "400",
                            marginTop: "10px",
                            fontFamily: "Source Sans Pro",
                          }}
                        >
                          {value.value}
                        </p>
                      </p>
                    );
                  });
                }
              })}
            </div>
            <div>
              <h2 style={{ marginBottom: "8px" }}>PRICE:</h2>
              <p className={styles.productPrice}>
                {currency}{" "}
                {product?.prices?.map((price) => {
                  if (price?.currency?.symbol == currency) {
                    return <span>{price?.amount}</span>;
                  }
                })}
              </p>
            </div>
            <div>
              <button
                className={`${styles.cartButton} ${
                  product?.inStock ? "" : styles.outStock
                }`}
                disabled={product?.inStock ? false : true}
                onClick={() => alert("hi")}
              >
                ADD TO CART
              </button>
            </div>
            <div>
              <p
                dangerouslySetInnerHTML={{ __html: description }}
                style={{ width: "300px" }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
