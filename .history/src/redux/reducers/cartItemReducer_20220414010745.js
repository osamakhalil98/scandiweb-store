export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      state.cartItems.filter(
        (item) => item.productName !== action.payload.productName
      );
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    default:
      return state;
  }
}
