import React, { Component, createRef } from "react";
import styles from "./Navbar.module.scss";
import { GET_CATEGORIES } from "../../graphql/queries";
import OutsideClicker from "../../utility/OutsideClicker";
import { Query } from "react-apollo";
import logo from "../../assets/logoIcon.png";
import cart from "../../assets/cart.png";
import wheel from "../../assets/wheel.png";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import setCategoryAction from "../../redux/actions/setCategoryAction";
import CartModal from "./CartModal";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.itemRef = createRef();
    this.cartRef = createRef();
    this.handleNav = this.handleNav.bind(this);
    this.accordingItems = [];
  }

  closeCurrency = () => {
    this.setState({
      currencySelectOpen: false,
    });
  };

  state = {
    currentCategoryName: "all",
    Currency: "$",
    currencySelectOpen: false,
    closeCurrencyModal: this.closeCurrency,
    cartModalSelectOpen: false,
  };
  defaultActiveCategoryColor = (cName) => {
    if (cName === this.state.currentCategoryName) {
      return styles.active;
    }
  };

  defaultCurrency = (cName) => {
    if (cName.symbol === this.state.Currency) {
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
  handleCartClick = () => {
    this.setState({
      cartModalSelectOpen: !this.state.cartModalSelectOpen,
    });
    if (this.state.cartModalSelectOpen) {
      this.cartRef.current.classList.add("backDrop");
    }
  };

  handleClickOutside = (clickedOutside) => {
    if (clickedOutside) {
      this.setState({
        currencySelectOpen: false,
        cartModalSelectOpen: false,
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
    this.props.setCategoryAction(
      this.accordingItems[idx].innerText.toLowerCase()
    );
    for (let item of this.accordingItems) {
      if (Number(item.dataset.listitem) === idx) {
        item.classList.add(styles.active);
      } else {
        item.classList.remove(styles.active);
      }
    }
  };

  render() {
    return (
      <>
        <nav className={styles.navContainer}>
          <div
            className={
              this.state.cartModalSelectOpen ? styles.overlaystyles : ""
            }
          ></div>
          <div className={styles.navCategories}>
            <Query query={GET_CATEGORIES}>
              {({ data }) => {
                if (data) {
                  return (
                    <React.Fragment>
                      {data.categories.map((category, idx) => (
                        <Link to={"/"} className={styles.td} key={idx}>
                          <p
                            key={idx}
                            ref={(ref) => (this.accordingItems[idx] = ref)}
                            onClick={() => this.handleNav(idx)}
                            className={`${
                              styles.navItem
                            } ${this.defaultActiveCategoryColor(
                              category.name
                            )} ${styles.cursor}`}
                            data-listitem={idx}
                          >
                            {category.name}
                          </p>
                        </Link>
                      ))}
                    </React.Fragment>
                  );
                } else {
                  return null;
                }
              }}
            </Query>

            <div className={styles.logoContainer}>
              <img src={logo} alt="store logo" />
            </div>
          </div>

          <OutsideClicker clicked={this.handleClickOutside}>
            <div className={styles.currencyContainer}>
              <p
                className={styles.optionCurrency}
                onClick={() => this.handleSelect()}
              >
                {this.props.currentCurrencyState.currentCurrency}
              </p>
              {this.arrowShape()}
            </div>
            {this.state.currencySelectOpen ? (
              <Modal closed={() => this.handleSelect()} />
            ) : (
              ""
            )}

            <div
              className={`${styles.cartContainer}`}
              onClick={() => this.handleCartClick()}
            >
              <div
                className={`${styles.itemsCartSum} ${
                  this.props.currentCartItemsState.cartItems.length === 0
                    ? styles.hidden
                    : ""
                } `}
                ref={this.cartRef}
              >
                {this.props.currentCartItemsState.itemslength === 0
                  ? ""
                  : this.props.currentCartItemsState.itemslength}
              </div>
              <img src={cart} alt="cart body" />
              <div className={styles.wheelsContainer}>
                <img src={wheel} className={styles.mr} alt="cart wheel 1" />
                <img src={wheel} alt="cart wheel 2" />
              </div>
            </div>
            {this.state.cartModalSelectOpen === true ? (
              <CartModal closeModal={() => this.handleCartClick()} />
            ) : (
              ""
            )}
          </OutsideClicker>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  setCategoryAction: (payload) => dispatch(setCategoryAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
