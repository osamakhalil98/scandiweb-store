export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      if (!state.cartItems.includes(action.payload.productName)) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    default:
      return state;
  }
}
