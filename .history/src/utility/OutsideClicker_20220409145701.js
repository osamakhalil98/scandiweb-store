import React, { Component } from "react";

export default class OutsideClicker extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleMouse = (event) => {
    if (event.type === "mousedown") {
      console.log("yes");
      this.handleClickOutside(event);
    }
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.clicked(true);
    }
  }

  render() {
    return (
      <div ref={this.wrapperRef} onMouseDown={this.handleMouse}>
        {this.props.children}
      </div>
    );
  }
}
