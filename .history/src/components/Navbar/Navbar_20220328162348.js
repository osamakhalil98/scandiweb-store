import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES } from "../../graphql/queries";
import { gql, useQuery } from "@apollo/client";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const { error, loading, data } = useQuery(GET_CATEGORIES);
  }
  render() {
    return (
      <>
        <nav className={styles.navContainer}>
          <ul>
            <li>hi</li>
            <li>bye</li>
            <li>lol</li>
          </ul>
        </nav>
      </>
    );
  }
}
