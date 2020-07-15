import * as ActionsTypes from '../../../constants/actionTypes';

export function hideToast() {
  return {
    type: ActionsTypes.HIDE_TOAST,
  };
}

export function displayToast(time) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.DISPLAY_TOAST,
    });
    setTimeout(() => dispatch(hideToast()), time);
  };
}

export function setToastText(text) {
  return {
    type: ActionsTypes.SET_TOAST_TEXT,
    text
  };
}
