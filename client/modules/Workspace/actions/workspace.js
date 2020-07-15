/* eslint-disable import/prefer-default-export */
import * as ActionsTypes from '../../../constants/actionTypes';

export function toggleToolsFrame() {
  return {
    type: ActionsTypes.TOGGLE_TOOLSFRAME,
  };
}
