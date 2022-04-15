import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ALL_PRODUCTS } from "../../graphql/queries";
import styles from "./Products.module.css";

export default class Grid extends Component {
  componentDidMount() {
    const getAllProducts = () => {
      const p = fetch(`${process.env.REACT_APP_DEV_URL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: `{
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
      })
        .then((res) => res.json)
        .then((data) => console.log(data));
      console.log(p);
    };
    getAllProducts();
  }
  render() {
    return <div className={styles.gridConatiner}></div>;
  }
}
