import { createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";

function configureStore(
  state = {
    currentCurrencyState: { currentCurrency: "$" },
    currentCategoryState: { currentCategory: "all" },
  }
) {
  return createStore(rootReducer, state);
}

export default configureStore;
