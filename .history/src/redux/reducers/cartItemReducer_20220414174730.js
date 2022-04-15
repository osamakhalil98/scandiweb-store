export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      let arr = [...state.cartItems, action.payload];

      for (let item of arr) {
        if (item.productName === action.payload.productName) {
          item.count = item.count + 1;
        }
      }

      arr = arr.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.productName === value.productName)
      );
      return {
        ...state,
        cartItems: [...arr],
      };

    case "increaseItemAction":


    return{
      ...state
      cartItems:[...arr]
    }
    default:
      return state;
  }
}
