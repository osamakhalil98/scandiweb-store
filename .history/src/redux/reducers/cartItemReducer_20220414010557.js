export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      if (!state.cartItems.includes(action.payload.productName)) {
        console.log(state.cartItems.includes(action.payload.productName));
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      } else {
        return;
      }
    default:
      return state;
  }
}
