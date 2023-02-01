export const actionType = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);
  console.log("Change 1");
  console.log("Adding feature");
  console.log("adding feature2");
  console.log("adding feature3");
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
