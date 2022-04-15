const decreaseCurrentItemsAction = (payload) => {
  return {
    type: "decreaseItemAction",
    payload,
  };
};

export default decreaseCurrentItemsAction;
