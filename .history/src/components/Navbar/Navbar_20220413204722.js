import React, { Component, createRef } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES, GET_CURRENCIES } from "../../graphql/queries";
import OutsideClicker from "../../utility/OutsideClicker";
import { Query } from "react-apollo";
import logo from "../../assets/logoIcon.png";
import cart from "../../assets/cart.png";
import wheel from "../../assets/wheel.png";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import CurrencyContext from "../../context/currencyContext";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.itemRef = createRef();
    this.handleNav = this.handleNav.bind(this);
    this.accordingItems = [];
  }

  closeCurrency = () => {
    this.setState({
      currencySelectOpen: false,
    });
  };

  static contextType = CurrencyContext;

  state = {
    currentCategoryName: "all",
    Currency: "$",
    currencySelectOpen: false,
    currencies: [],
    closeCurrencyModal: this.closeCurrency,
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

  handleSelect = () => {
    this.setState({
      currencySelectOpen: !this.state.currencySelectOpen,
    });
  };

  handleNav = (idx) => {
    this.setState({
      currentCategoryName: this.accordingItems[idx].innerText.toLowerCase(),
    });
    const { category, setCategory } = this.context;
    setCategory(this.accordingItems[idx].innerText.toLowerCase());
    for (let item of this.accordingItems) {
      if (Number(item.dataset.listitem) === idx) {
        item.classList.add(styles.active);
      } else {
        item.classList.remove(styles.active);
      }
    }
  };

  render() {
    const { currency, cartItems } = this.context;

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
                        <Link>
                          <p
                            key={category.name}
                            style={{ cursor: "pointer" }}
                            ref={(ref) => (this.accordingItems[idx] = ref)}
                            onClick={() => this.handleNav(idx)}
                            className={`${
                              styles.navItem
                            } ${this.defaultActiveCategoryColor(
                              category.name
                            )}`}
                            data-listitem={idx}
                          >
                            {category.name}
                          </p>
                        </Link>
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

          <OutsideClicker clicked={this.handleClickOutside}>
            <div className={styles.currencyContainer}>
              <p className={styles.optionCurrency}>{currency}</p>
              {this.arrowShape()}
            </div>
            {this.state.currencySelectOpen ? <Modal /> : ""}
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
