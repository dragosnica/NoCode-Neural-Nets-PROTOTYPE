import * as ActionsTypes from '../../../constants/actionTypes';

const preloadedState = {
  toolsFrameEnable: true,
};

const workspace = (state = preloadedState, action) => {
  switch (action.type) {
    case ActionsTypes.TOGGLE_TOOLSFRAME:
      return { ...state, toolsFrameEnable: !state.toolsFrameEnable };
    default:
      return state;
  }
};

export default workspace;
