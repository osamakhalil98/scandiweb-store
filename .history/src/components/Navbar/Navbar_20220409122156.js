import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import OutsideClicker from "../../utility/OutsideClicker";
import { Query } from "react-apollo";
import logo from "../../assets/logoIcon.png";
import cart from "../../assets/cart.png";
import wheel from "../../assets/wheel.png";
import Modal from "./Modal";
import CurrencyContext from "../../context/currencyContext";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef(null);
  }
  setCurrency = (Currency) => {
    this.setState({ Currency });
  };

  closeCurrencyOpen = () => {
    this.setState({
      currencySelectOpen: false,
    });
  };
  //static contextType = CurrencyContext;

  state = {
    currentCategoryName: "all",
    Currency: "$",
    currencySelectOpen: false,
    currencies: [],
    setCurrency: this.setCurrency,
  };
  defaultActiveCategoryColor = (cName) => {
    if (cName === this.state.currentCategoryName) {
      return styles.active;
    }
  };

  defaultCurrency = (cName) => {
    if (cName.symbol == this.state.Currency) {
      return (
        <p key={cName.symbol} className={styles.optionCurrency}>
          {cName.symbol}{" "}
        </p>
      );
    }
  };

  arrowShape = () => {
    if (this.state.currencySelectOpen) {
      return (
        <p>
          <i
            className={`${styles.arrow} ${styles.up}`}
            onClick={() => this.handleSelect()}
          ></i>
        </p>
      );
    } else {
      return (
        <p>
          <i
            className={`${styles.arrow} ${styles.down}`}
            onClick={() => this.handleSelect()}
          ></i>
        </p>
      );
    }
  };

  handleClickOutside = (clickedOutside) => {
    if (clickedOutside) {
      this.setState({
        currencySelectOpen: false,
      });
    }
  };
  handleCurrencySelected = (clickedInside) => {
    if (clickedInside) {
      this.setState({
        currencySelectOpen: false,
      });
    }
  };
  handleSelect = () => {
    this.setState({
      currencySelectOpen: !this.state.currencySelectOpen,
    });
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

          <OutsideClicker
            clicked={this.handleClickOutside}
            selected={this.handleCurrencySelected}
          >
            <CurrencyContext.Provider value={this.state}>
              <div className={styles.currencyContainer}>
                <p className={styles.optionCurrency}>{this.state.Currency}</p>
                {this.arrowShape()}
              </div>
              {this.state.currencySelectOpen ? <Modal /> : ""}
            </CurrencyContext.Provider>
          </OutsideClicker>
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
