export default function cartItemReducer(state = [], action) {
  let arr = state;
  switch (action.type) {
    case "cartItemAction":
      arr.push(action.payload);
      return {
        ...state,
        cartItems: [...arr],
      };
    default:
      return state;
  }
}
