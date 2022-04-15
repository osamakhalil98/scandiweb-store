export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      let arr = [...state.cartItems, action.payload];

      arr = arr.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.productName === value.productName)
      );
      return {
        ...state,
        cartItems: [...arr],
      };
    default:
      return state;
  }
}
