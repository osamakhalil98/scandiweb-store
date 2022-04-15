import React, { Component } from "react";

const CategoryContext = React.createContext();

class CategoryContextProvider extends Component {
  // Context state
  state = {
    category: "all",
    setCategory: () => {},
  };

  // Method to update state
  setCategory = (category) => this.setState({ category: category });

  render() {
    const { children } = this.props;
    const { category } = this.state;
    const setCategory = this.setCategory;

    return (
      <CategoryContext.Provider value={{ category, setCategory }}>
        {children}
      </CategoryContext.Provider>
    );
  }
}

export { CategoryContextProvider };
export default CategoryContext;
