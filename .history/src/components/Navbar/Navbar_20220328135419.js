import React, { Component } from "react";
import styles from "./Navbar.module.css";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <nav className={styles.navContainer}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </>
    );
  }
}
