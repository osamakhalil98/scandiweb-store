import React, { Component } from "react";
import styles from "./ProductsDetails.module.scss";
import { GET_PRODUCT } from "../../graphql/queries";
import { connect } from "react-redux";
import setCartItemsAction from "../../redux/actions/setCartItemsAction";
import { toast, Toaster } from "react-hot-toast";

class ProductsDetails extends Component {
  state = {
    productData: [],
    selectedAttributes: [],
    mainImage: "",
  };

  bigImage = "";
  clickedItems = [];
  AMOUNT = "";

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

  handleCurrency = (pPrices) => {
    pPrices?.map((pPrice) => {
      if (
        pPrice?.currency?.symbol ===
        this.props.currentCurrencyState.currentCurrency
      ) {
        this.AMOUNT = `${pPrice?.currency?.symbol} ${pPrice.amount}`;
        return this.AMOUNT;
      } else {
        return;
      }
    });
  };

  componentDidMount() {
    const prodcutid = this.props.match.params.productid;
    this.getProduct(prodcutid);
    this.clickedItems.map((item) =>     console.log(item);
  );
  }

  addItem = (e) => {
    const { product } = this.state.productData;
    const { gallery, name, brand, prices, attributes, id } = product;

    const cartItem = {
      productImage: gallery[0],
      productName: name,
      productBrand: brand,
      productPrice: prices,
      gallery: gallery,
      prodAttrs: attributes,
      count: 1,
      productId: id,
    };
    this.props.setCartItemsAction(cartItem);
    toast("Item added to cart!", {
      icon: "✔",
    });
  };
  render() {
    const { product } = this.state.productData;
    let description = product?.description;
    description = description?.replace(/['"]+/g, "");

    return (
      <div className={styles.productsDetailsConatiner}>
        <Toaster />
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
                if (product?.type === "swatch") {
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
                            className={
                              idx == 0 ? styles.lowOpacity : styles.highOpacity
                            }
                            key={idx}
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
                          <button
                            style={{
                              width: 50,
                              height: 45,
                              marginInlineEnd: 10,
                              border: "1px solid black",
                              cursor: "pointer",
                              textAlign: "center",
                              marginTop: "8px",
                            }}
                            className={
                              idx === 0
                                ? styles.selectedAttr
                                : styles.notSelectedAttr
                            }
                            key={idx}
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
                              className={styles.attrValue}
                            >
                              {value.value}
                            </p>
                          </button>
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
                {this.props.currentCurrencyState.currentCurrency}{" "}
                {product?.prices?.map((price) => {
                  if (
                    price?.currency?.symbol ==
                    this.props.currentCurrencyState.currentCurrency
                  ) {
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
                onClick={() => this.addItem()}
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

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setCartItemsAction: (payload) => dispatch(setCartItemsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);
