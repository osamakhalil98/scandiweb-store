export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      return {
        ...state,
        cartItems: cartItems.push(action.payload),
      };
    default:
      return state;
  }
}
