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
      let prevArrState = [...state.cartItems, action.payload];

      for (let item of prevArrState) {
        if (item.productName === action.payload.productName) {
          item.count = item.count + 1;
        }
      }
      prevArrState = prevArrState.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.productName === value.productName)
      );
      return {
        ...state,
        cartItems: [...prevArrState],
      };

    case "decreaseItemAction":
      let prevState = [...state.cartItems, action.payload];
      console.log(prevState);

      for (let item of prevState) {
        if (item.productName === action.payload.productName) {
          if (item.count === 2) {
            let idx = prevState.findIndex((i) => i == item);
            console.log(idx);
            if (idx === 0) {
              prevState.splice(idx, 2);
            } else if (idx === prevState.length - 2) {
              prevState.splice(idx, 2);
            } else {
              prevState.splice(idx + 1, 2);
              console.log("after splicing", prevState);
            }
          } else {
            item.count = item.count - 1;
          }
        }
      }
      prevState = prevState.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.productName === value.productName)
      );
      return {
        ...state,
        cartItems: [...prevState],
      };
    default:
      return state;
  }
}
