export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      let arr = [...state.cartItems, action.payload];
      let filteredArr = arr.filter(
        (item) => item.name !== action.payload.productName
      );
      return {
        ...state,
        cartItems: [...filteredArr],
      };
    default:
      return state;
  }
}
