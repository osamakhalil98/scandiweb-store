export default function categoryReducer(state, action) {
  switch (action.type) {
    case "categoryAction":
      return {
        ...state,
        currentCategory: action.payload,
      };
    default:
      return state;
  }
}
