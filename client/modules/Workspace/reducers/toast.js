import * as ActionsTypes from '../../../constants/actionTypes';

const preloadedState = {
  displayToast: false,
  toastText: '',
};

const toast = (state = preloadedState, action) => {
  switch (action.type) {
    case ActionsTypes.DISPLAY_TOAST:
      return {
        ...state,
        displayToast: true
      };
    case ActionsTypes.HIDE_TOAST:
      return {
        ...state,
        displayToast: false
      };
    case ActionsTypes.SET_TOAST_TEXT:
      return {
        ...state,
        toastText: action.text
      };
    default:
      return state;
  }
};

export default toast;
