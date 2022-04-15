import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES } from "../../graphql/queries";
import { gql } from "graphql-tag";
import { Query } from "react-apollo";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  render() {
    return (
      <>
        <nav className={styles.navContainer}>
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading) {
                return <h4>loading ...</h4>;
              }
              if (error) {
                console.log(error);
              }
              <h2>Test</h2>;
            }}
          </Query>
        </nav>
      </>
    );
  }
}
