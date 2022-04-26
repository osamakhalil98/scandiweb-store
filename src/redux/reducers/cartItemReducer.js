export default function cartItemReducer(state = [], action) {
  let itemsLength = state.itemslength;
  let sumOfItemQty = [];
  switch (action.type) {
    case "cartItemAction":
      let arr = [...state.cartItems];
      if (state.cartItems.length === 0) {
        arr = [...state.cartItems, action.payload];
      } else {
        for (let item of state.cartItems) {
          if (item.productName === action.payload.productName) {
            if (item.prodAttrs.length > 0 && item.selectedAttr) {
              if (
                JSON.stringify(item.selectedAttr) ===
                JSON.stringify(action.payload.selectedAttr)
              ) {
                item.count = item.count + 1;
              } else {
                arr.push(action.payload);
              }
            } else {
              item.count = item.count + 1;
            }
          } else {
            arr.push(action.payload);
          }
        }
      }

      arr = arr.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              JSON.stringify(t.selectedAttr) ===
              JSON.stringify(value.selectedAttr)
          )
      );
      for (let item of arr) {
        sumOfItemQty.push(item.count);
      }
      itemsLength = sumOfItemQty.reduce((a, b) => a + b, 0);

      return {
        ...state,
        cartItems: [...arr],
        itemslength: itemsLength,
      };

    case "increaseItemAction":
      let prevArrState = [...state.cartItems];
      for (let item of prevArrState) {
        if (item.productName === action.payload.productName) {
          if (item.prodAttrs.length > 0 && item.selectedAttr) {
            if (
              JSON.stringify(item.selectedAttr) ===
              JSON.stringify(action.payload.selectedAttr)
            ) {
              item.count = item.count + 1;
            }
          } else {
            item.count = item.count + 1;
          }
        }
      }
      for (let item of prevArrState) {
        sumOfItemQty.push(item.count);
      }
      itemsLength = sumOfItemQty.reduce((a, b) => a + b, 0);
      return {
        ...state,
        cartItems: [...prevArrState],
        itemslength: itemsLength,
      };

    case "decreaseItemAction":
      let prevState = [...state.cartItems];

      for (let item of prevState) {
        if (item.productName === action.payload.productName) {
          if (item.prodAttrs.length > 0 && item.selectedAttr) {
            if (
              JSON.stringify(item.selectedAttr) ===
              JSON.stringify(action.payload.selectedAttr)
            ) {
              if (item.count > 1) {
                item.count = item.count - 1;
              } else {
                prevState = prevState.filter(
                  (s) =>
                    JSON.stringify(s.selectedAttr) !==
                    JSON.stringify(action.payload.selectedAttr)
                );
              }
            } else {
              /* console.log("hi");
              /*if (item.count === 1) {
                prevState = prevState.filter(
                  (value, index, self) =>
                    index ===
                    self.findIndex(
                      (t) =>
                        JSON.stringify(t.selectedAttr) !==
                        JSON.stringify(value.selectedAttr)
                    )
                );
              } else {
                item.count = item.count - 1;
              }*/
            }
          } else {
            if (item.count > 1) {
              item.count = item.count - 1;
            } else {
              prevState = prevState.filter(
                (i) => i.productName !== action.payload.productName
              );
            }
          }
        }
      }

      for (let item of prevState) {
        sumOfItemQty.push(item.count);
      }
      itemsLength = sumOfItemQty.reduce((a, b) => a + b, 0);

      return {
        ...state,
        cartItems: [...prevState],
        itemslength: itemsLength,
      };
    case "clearItemsAction":
      let deleteArr = [...state.cartItems];
      deleteArr = [];
      return {
        ...state,
        cartItems: [...deleteArr],
        itemsLength: 0,
      };

    default:
      return state;
  }
}
