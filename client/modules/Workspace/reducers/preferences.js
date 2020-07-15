import * as ActionsTypes from '../../../constants/actionTypes';

const preloadedState = {
  theme: 'light',
};

const preferences = (state = preloadedState, action) => {
  switch (action.type) {
    case ActionsTypes.SET_THEME:
      return { ...state, theme: action.value };
    default:
      return state;
  }
};

export default preferences;
