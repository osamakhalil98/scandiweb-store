import React, { Component } from "react";
import { findDOMNode } from "react-dom";

export default class OutsideClicker extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    findDOMNode(this).addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    findDOMNode(this).removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.clicked(true);
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
