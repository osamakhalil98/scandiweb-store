export default function cartItemReducer(state = [], action) {
  switch (action.type) {
    case "cartItemAction":
      // allowing to add the same item only one item and to increase it in cart and cart overlay
      const objectMap = new Map();
      let arr = [...state.cartItems, action.payload];
      arr.forEach((object) => {
        objectMap.set(object.productName, object);
      });

      return {
        ...state,
        cartItems: [arr],
      };
    default:
      return state;
  }
}
