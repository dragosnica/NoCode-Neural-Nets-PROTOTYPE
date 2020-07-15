import * as ActionsTypes from '../../../constants/actionTypes';

const preloadedState = {
  authenticated: false,
  user: {},
  preferences: {},
  authError: {},
  signupVerification: '',
  passwordResetInitiated: false,
};

const user = (state = preloadedState, action) => {
  switch (action.type) {
    case ActionsTypes.AUTHENTICATE_USER:
      return {
        ...state,
        authenticated: true,
        user: action.user,
      };
    case ActionsTypes.AUTHENTICATION_ERROR:
      return {
        ...state,
        authenticated: false,
        user: {},
        preferences: {},
        authError: action.payload,
      };
    case ActionsTypes.UNAUTHENTICATE_USER:
      return {
        ...state,
        authenticated: false,
        user: {},
        preferences: {},
        authError: {},
      };
    case ActionsTypes.VERIFY_SIGNUP_INITIATE:
      return {
        ...state,
        signupVerification: 'verifying'
      };
    case ActionsTypes.VERIFY_SIGNUP_SUCCESSFUL:
      return {
        ...state,
        signupVerification: 'successful'
      };
    case ActionsTypes.VERIFY_SIGNUP_FAILED:
      return {
        ...state,
        signupVerification: 'failed'
      };
    case ActionsTypes.PASSWORD_RESET_INITIATE:
      return {
        ...state,
        passwordResetInitiated: true,
      };
    case ActionsTypes.RESET_PASSWORD_RESET_INITIATE:
      return {
        ...state,
        passwordResetInitiated: false,
      };
    default:
      return state;
  }
};

export default user;
