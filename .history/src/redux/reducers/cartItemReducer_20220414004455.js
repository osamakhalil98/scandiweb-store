export default function cartItemReducer(state = [], action) {
  let arr = [];
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
