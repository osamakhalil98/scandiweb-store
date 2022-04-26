import React, { Component } from "react";
import styles from "./ProductsDetails.module.scss";
import { GET_PRODUCT } from "../../graphql/queries";
import { connect } from "react-redux";
import setCartItemsAction from "../../redux/actions/setCartItemsAction";

class ProductsDetails extends Component {
  constructor(props) {
    super(props);
    this.handleAttrClick = this.handleAttrClick.bind(this);
  }
  state = {
    productData: [],
    selectedAttributes: {},
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
      .then((data) => {
        let defaultAttrs = this.state.selectedAttributes;
        for (let attr of data.data.product.attributes) {
          defaultAttrs[attr.name] = attr.items[0].value;
        }
        this.setState({
          selectedAttributes: { ...defaultAttrs },
        });
        this.setState({
          productData: data.data,
        });
      });
  };
  handleGallerySelect = (prod) => {
    this.setState({
      mainImage: prod,
    });
  };

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

  componentDidMount() {
    const prodcutid = this.props.match.params.productid;
    this.getProduct(prodcutid);
  }

  handleAttrClick = (key, value) => {
    let newAttrSelected = this.state.selectedAttributes;
    newAttrSelected[key] = value;
    this.setState({
      selectedAttributes: newAttrSelected,
    });
  };

  addItem = () => {
    const { product } = this.state.productData;
    let setAttrs = this.state.selectedAttributes;
    const { gallery, name, brand, prices, attributes, id } = product;
    const cartItem = {
      productImage: gallery[0],
      productName: name,
      productBrand: brand,
      productPrice: prices,
      gallery: gallery,
      prodAttrs: attributes,
      selectedAttr: attributes === [] ? {} : { ...setAttrs },
      length: 1,
      count: 1,
      productId: id,
    };
    this.props.setCartItemsAction({ ...cartItem });
    alert("Item added to cart!");
  };

  render() {
    const { product } = this.state.productData;
    let description = product?.description;
    description = description?.replace(/['"]+/g, "");

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
                  alt="product details"
                  className={styles.imgStyles}
                  onClick={() => this.handleGallerySelect(prod)}
                />
              );
            })}
          </div>
          <div className={styles.imgContainer}>
            {product?.inStock ? (
              ""
            ) : (
              <h2 className={styles.outStocktitle}>OUT OF STOCK!</h2>
            )}
            <img
              src={this.state.mainImage ? this.state.mainImage : this.bigImage}
              alt="gallery"
              width={580}
              className={`${product?.inStock ? "" : styles.outStock} ${
                styles.bigImage
              }`}
              height={480}
              //style={{ objectFit: "contain" }}
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
                      <div className={styles.flex}>
                        {product?.items?.map((color, idx) => (
                          <p
                            style={{
                              backgroundColor: color.value,
                            }}
                            className={`${
                              this.state.selectedAttributes[product?.name] ===
                              color.value
                                ? styles.selectedColor
                                : ""
                            } ${styles.attrStyles}`}
                            data-item={idx}
                            ref={(ref) => this.clickedItems.push(ref)}
                            onClick={() =>
                              this.handleAttrClick(product?.name, color.value)
                            }
                          ></p>
                        ))}
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <h3 className={styles.attrName}>{product?.name}:</h3>
                      <div className={styles.selectedAttrcontainer}>
                        {product?.items?.map((value, idx) => (
                          <button
                            className={`${
                              this.state.selectedAttributes[product?.name] ===
                              value.value
                                ? styles.selectedAttr
                                : styles.notSelectedAttr
                            } ${styles.attr}`}
                            data-item={idx}
                            ref={(ref) => this.clickedItems.push(ref)}
                            onClick={() =>
                              this.handleAttrClick(product?.name, value.value)
                            }
                          >
                            <p className={styles.attrValue}>{value.value}</p>
                          </button>
                        ))}
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <div>
              <h2 className={styles.mb}>PRICE:</h2>
              <p className={styles.productPrice}>
                {this.props.currentCurrencyState.currentCurrency}{" "}
                {product?.prices?.map((price) =>
                  price?.currency?.symbol ===
                  this.props.currentCurrencyState.currentCurrency ? (
                    <span>{price?.amount}</span>
                  ) : (
                    ""
                  )
                )}
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
                className={styles.w300}
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
