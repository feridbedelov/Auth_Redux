import { CHANGE_LANG } from "./constants";

export const changeLang = (code) => {
  localStorage.setItem("lang", code);

  return {
    type: CHANGE_LANG,
    payload: code,
  };
};
