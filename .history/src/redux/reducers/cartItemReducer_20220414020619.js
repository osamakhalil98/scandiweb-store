export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      const objectsMap = new Map();
      let arr = [...state.cartItems, action.payload];
      arr.forEach((object) => {
        console.log(object);
        objectsMap.set(object.productName, object);
      });
      console.log(objectsMap);
      return {
        ...state,
        cartItems: [objectsMap],
      };
    default:
      return state;
  }
}
