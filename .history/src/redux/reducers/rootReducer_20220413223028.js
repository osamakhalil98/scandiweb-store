import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  currentCurrencyState: currencyReducer,
  currentCategoryState: categoryReducer,
});
