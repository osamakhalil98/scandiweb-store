export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      let arr = [];
      arr.push(action.payload);
      return {
        ...state,
        cartItems: [...arr],
      };
    default:
      return state;
  }
}
