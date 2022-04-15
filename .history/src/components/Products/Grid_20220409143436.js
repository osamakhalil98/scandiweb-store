import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Grid extends Component {
  componentDidMount() {
    const getAllProducts = async () => {
      const products = await fetch(`${process.env.REACT_APP_DEV_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `query{
                category(input: { title: "all" }) {
                  name
                  products {
                    name
                    id
                    brand
                    attributes {
                      id
                      name
                      type
                    }
                    category
                    gallery
                    inStock
                    description
                    prices {
                      amount
                      currency {
                        label
                        symbol
                      }
                    }
                  }
                }
              }`,
        }),
      }).then((res) => res.json());
      console.log(products);
    };
    getAllProducts();
  }
  render() {
    return <div className={styles.gridConatiner}></div>;
  }
}
