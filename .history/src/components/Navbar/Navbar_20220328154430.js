import React, { Component } from "react";
import styles from "./Navbar.module.css";
import { GET_CATEGORIES } from "../../graphql/queries";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {}
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
