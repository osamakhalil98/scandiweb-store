export default (state, action) => {
  switch (action.type) {
    case "currencyAction":
      return {
        ...state,
        currentCurrency: action.payload,
      };
  }
};
