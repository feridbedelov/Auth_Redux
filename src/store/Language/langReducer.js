import { CHANGE_LANG } from "./constants";

const initialState = {
  lang: localStorage.getItem("lang"),
};

const langReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default langReducer;
