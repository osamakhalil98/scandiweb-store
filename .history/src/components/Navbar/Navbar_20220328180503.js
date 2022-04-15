import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES } from "../../graphql/queries";
import { Query } from "react-apollo";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef(null);
    this.state = {
      currentCategoryName: "all",
    };
  }

  render() {
    return (
      <>
        <nav className={styles.navContainer}>
          <div className={styles.navCategories}>
            <Query query={GET_CATEGORIES}>
              {({ loading, error, data }) => {
                if (data) {
                  return data.categories.map((category) => (
                    <p
                      key={category.name}
                      className={`${styles.navItem}`}
                      ref={itemRef}
                    >
                      {category.name}
                    </p>
                  ));
                }
              }}
            </Query>
          </div>
        </nav>
      </>
    );
  }
}
