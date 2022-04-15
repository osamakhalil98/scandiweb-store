export default function cartItemReducer(state = [], action) {
  let addedBefore = true;
  switch (action.type) {
    case "cartItemAction":
      for (let item of state.cartItems) {
        if (item.productName !== action.payload.productName) {
          addedBefore = false;
        } else {
          addedBefore = true;
        }
      }
      if (!addedBefore) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }

    default:
      return state;
  }
}
