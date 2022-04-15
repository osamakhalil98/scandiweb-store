export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      return {
        ...state,
        cartItems: state.push(action.payload),
      };
    default:
      return state;
  }
}
