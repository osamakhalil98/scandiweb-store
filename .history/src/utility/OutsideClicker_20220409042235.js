import React, { Component } from "react";

export default class OutsideClicker extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    console.log(this.props.secondRef.current);
    if (
      (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) ||
      (this.props.secondRef &&
        !this.props.secondRef?.current?.contains(event.target))
    ) {
      this.props.clicked(true);
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
