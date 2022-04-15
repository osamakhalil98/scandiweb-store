import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  currentCurrency: currencyReducer,
  currentCategory: categoryReducer,
});
