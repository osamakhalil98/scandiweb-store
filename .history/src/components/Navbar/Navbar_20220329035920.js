import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import { Query } from "react-apollo";
import logo from "../../assets/logoIcon.png";
import cart from "../../assets/cart.png";
import wheel from "../../assets/wheel.png";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef(null);
    this.state = {
      currentCategoryName: "all",
    };
  }

  defaultActiveCategoryColor = (cName) => {
    if (cName === this.state.currentCategoryName) {
      return styles.active;
    }
  };
  render() {
    const { itemRef } = this.itemRef;

    return (
      <>
        <nav className={styles.navContainer}>
          <div className={styles.navCategories}>
            <Query query={GET_CATEGORIES}>
              {({ data }) => {
                if (data) {
                  return (
                    <>
                      {data.categories.map((category, idx) => (
                        <p
                          key={category.name}
                          className={`${
                            styles.navItem
                          } ${this.defaultActiveCategoryColor(category.name)}`}
                          ref={itemRef}
                          listitem={idx}
                        >
                          {category.name}
                        </p>
                      ))}
                    </>
                  );
                } else {
                  return null;
                }
              }}
            </Query>
            <div className={styles.logoContainer}>
              <img src={logo} />
            </div>
          </div>

          <Query query={GET_CURRENCIES}>
            {({ data }) => {
              if (data) {
                console.log(data);
                return (
                  <>
                    <select name="currenciesList" id="currenciesList">
                      {data.currencies.map((currency, idx) => {
                        <option value="option 1" key={currency.symbol}>
                          {currency.symbol}
                        </option>;
                      })}
                    </select>
                  </>
                );
              } else {
                return null;
              }
            }}
          </Query>
          <div className={styles.cartContainer}>
            <img src={cart} />

            <div className={styles.wheelsContainer}>
              <img src={wheel} style={{ marginRight: "3px" }} />
              <img src={wheel} />
            </div>
          </div>
        </nav>
      </>
    );
  }
}
