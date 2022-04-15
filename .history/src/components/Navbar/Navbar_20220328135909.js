import React, { Component } from "react";
import styles from "./Navbar.module.css";

export default class Navbar extends Component {
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
