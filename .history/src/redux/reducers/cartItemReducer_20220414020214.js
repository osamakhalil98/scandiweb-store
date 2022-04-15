export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      const objectsMap = new Map();
      let arr = [...state.cartItems, action.payload];
      arr.forEach((object) => {
        objectsMap.set(object.place, object);
      });
      return {
        ...state,
        cartItems: arr,
      };
    default:
      return state;
  }
}
