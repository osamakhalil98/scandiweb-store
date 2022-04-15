import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import categoryReducer from "./categoryReducer";
import cartItemReducer from "./cartItemReducer";

export default combineReducers({
  currentCurrencyState: currencyReducer,
  currentCategoryState: categoryReducer,
  currentCartItemsState: cartItemReducer,
});
