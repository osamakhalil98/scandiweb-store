export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      for (let item of state.cartItems) {
        if (item.productName !== action.payload.productName) {
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload],
          };
        }
      }

    default:
      return state;
  }
}
