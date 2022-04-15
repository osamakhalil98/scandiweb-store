import React, { Component } from "react";
import styles from "./ProductsDetails.module.scss";
import { GET_PRODUCT } from "../../graphql/queries";
import CurrencyContext from "../../context/currencyContext";

export default class ProductsDetails extends Component {
  state = {
    productData: [],
    selectedAttributes: [],
    mainImage: "",
  };

  bigImage = "";
  clickedItems = [];
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
  handleAttrSelect = (name, idx) => {
    if (this.clickedItems.length === 7) {
      if (name === "Capacity") {
        let slicedArr = this.clickedItems.slice(0, 2);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      } else if (name === "With USB 3 ports") {
        let slicedArr = this.clickedItems.slice(2, 4);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      } else {
        let slicedArr = this.clickedItems.slice(4, 6);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      }
    }
    if (this.clickedItems.length === 6) {
      if (name === "Capacity") {
        let slicedArr = this.clickedItems.slice(0, 2);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      } else if (name === "With USB 3 ports") {
        let slicedArr = this.clickedItems.slice(2, 4);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      } else {
        let slicedArr = this.clickedItems.slice(4, 6);
        slicedArr.forEach((item, index) => {
          if (item.getAttribute("data-item") === `${idx}`) {
            if (item.classList.contains(styles.notSelectedAttr)) {
              item.classList.remove(styles.notSelectedAttr);
              item.classList.add(styles.selectedAttr);
            } else {
              item.classList.toggle(styles.selectedAttr);
            }
          } else {
            item.classList.add(styles.notSelectedAttr);
          }
        });
      }
    } else {
      this.clickedItems.forEach((item, index) => {
        console.log(item?.getAttribute("data-item"));
        if (item.getAttribute("data-item") === `${idx}`) {
          if (item.classList.contains(styles.notSelectedAttr)) {
            item.classList.remove(styles.notSelectedAttr);
            item.classList.add(styles.selectedAttr);
          } else {
            item.classList.toggle(styles.selectedAttr);
          }
        } else {
          item.classList.add(styles.notSelectedAttr);
        }
      });
    }
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

            <div className={styles.attrContainer}>
              {product?.attributes?.map((product, idx) => {
                console.log(this.props.prodAttrs);
                if (product.type === "swatch") {
                  return (
                    <>
                      <h3 className={styles.attrName}>{product?.name}:</h3>
                      <div style={{ display: "flex" }}>
                        {product?.items?.map((color, idx) => (
                          <p
                            style={{
                              backgroundColor: color.value,
                              width: 50,
                              height: 45,
                              marginInlineEnd: 10,
                              border: "1px solid black",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                            onClick={() =>
                              this.handleAttrSelect(product.name, idx)
                            }
                            data-item={idx}
                            ref={(ref) => this.clickedItems.push(ref)}
                          ></p>
                        ))}
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <h3 className={styles.attrName}>{product?.name}:</h3>
                      <div
                        style={{
                          display: "flex",
                          marginBottom: "10px",
                        }}
                      >
                        {product?.items?.map((value, idx) => (
                          <p
                            style={{
                              backgroundColor: value.value,
                              width: 50,
                              height: 45,
                              marginInlineEnd: 10,
                              border: "1px solid black",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                            onClick={() =>
                              this.handleAttrSelect(product.name, idx)
                            }
                            data-item={idx}
                            ref={(ref) => this.clickedItems.push(ref)}
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
                        ))}
                      </div>
                    </>
                  );
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
