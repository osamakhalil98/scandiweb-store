import { createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";

function configureStore(
  state = {
    currentCurrencyState: { currentCurrency: "$" },
    currentCategoryState: { currentCategory: "all" },
    currentCartItemsState: { cartItems: [], itemslength: 0 },
  }
) {
  return createStore(rootReducer, state);
}

export default configureStore;
