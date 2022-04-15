import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES } from "../../graphql/queries";
import { Query } from "react-apollo";
import logo from "../../assets/logoIcon.png";

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
            <div style={styles.logoContainer}>
              <img src={logo} />
            </div>
          </div>
        </nav>
      </>
    );
  }
}