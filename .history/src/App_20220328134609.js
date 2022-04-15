import React, { Component } from "react";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div>Hello from class component</div>
      </>
    );
  }
}

export default App;
