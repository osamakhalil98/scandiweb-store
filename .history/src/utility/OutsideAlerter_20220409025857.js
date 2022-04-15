import React, { Component } from "react";

export default class OutsideAlerter extends Component {
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
    const { currencySelectOpen } = this.props;
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      return (
        <p>
          <i
            className={`${this.props.arrow} ${this.props.down}`}
            onClick={() => this.props.handleSelect()}
          ></i>
        </p>
      );
    }
  }

  render() {
    return <div ref={this.wrapperRef}>{this.props.children}</div>;
  }
}
