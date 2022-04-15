export default currencyReducer = (state, action) => {
  switch (action.type) {
    case "currencyAction":
      return {
        ...state,
        currentCurrency: action.payload,
      };
    default:
      return state;
  }
};
