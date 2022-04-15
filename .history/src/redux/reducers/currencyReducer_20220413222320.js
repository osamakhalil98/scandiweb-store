export default (state, action) => {
  switch (action.type) {
    case "currencyAction":
      return {
        ...state,
        currentCurrency: action.payload,
      };
    case "categoryAction":
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      return state;
  }
};
