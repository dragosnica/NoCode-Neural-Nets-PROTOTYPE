/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import * as ActionsTypes from '../../../constants/actionTypes';

const API_ROOT_URL = process.env.API_URL;

export function authError(error) {
  return {
    type: ActionsTypes.AUTHENTICATION_ERROR,
    payload: error
  };
}

export function signInUserSuccessful(user) {
  return {
    type: ActionsTypes.AUTHENTICATE_USER,
    user
  };
}

function signUpUser(formValues) {
  return axios.post(`${API_ROOT_URL}/signup`, formValues);
}

export function validateAndSignUpUser(formValues, dispatch) {
  return new Promise((resolve, reject) => {
    signUpUser(formValues)
      .then((response) => {
        dispatch(signInUserSuccessful(response.data));
        resolve();
      })
      .catch((error) => {
        dispatch(authError(error.response.data.message));
        reject({ username: error.response.data.message, _error: 'Registration failed!' });
      });
  });
}

export function verifyEmail(token) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.VERIFY_SIGNUP_INITIATE,
    });
    return axios.get(`${API_ROOT_URL}/verify?t=${token}`, {})
      .then((response) => {
        dispatch({
          type: ActionsTypes.VERIFY_SIGNUP_SUCCESSFUL
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionsTypes.VERIFY_SIGNUP_FAILED
        });
      });
  };
}

function signInUser(formValues) {
  return axios.post(`${API_ROOT_URL}/signin`, formValues);
}

export function validateAndSignInUser(formValues, dispatch) {
  return new Promise((resolve, reject) => {
    signInUser(formValues)
      .then((response) => {
        dispatch(signInUserSuccessful(response.data));
        // dispatch({
        //   type: ActionsTypes.SET_PREFERENCES,
        //   preferences: response.data.preferences
        // });
        resolve();
      })
      .catch((error) => {
        dispatch(authError(error.response.data.message));
        reject({ error: error.response.data.message, _error: 'Sign in failed!' });
      });
  });
}

export function initiateResetUserPassword(formValues, dispatch) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_ROOT_URL}/reset-pw`, formValues)
      .then(() => {
        dispatch({
          type: ActionsTypes.PASSWORD_RESET_INITIATE
        });
        resolve();
      })
      .catch((error) => {
        dispatch(authError(error.response.data.message));
        reject({ error: error.response.data.message, _error: 'Reset password failed!' });
      });
  });
}

function resetUserPassword(formValues) {
  return axios.post(`${API_ROOT_URL}/new-pw`, formValues);
}

export function validateAndResetUserPassword(formValues, dispatch) {
  return new Promise((resolve, reject) => {
    resetUserPassword(formValues)
      .then((response) => {
        dispatch(signInUserSuccessful(response.data));
        dispatch({
          type: ActionsTypes.RESET_PASSWORD_RESET_INITIATE
        });
        resolve();
      })
      .catch((error) => {
        dispatch(authError(error.response.data.message));
        reject({ username: error.response.data.message, _error: 'Password update failed!' });
      });
  });
}

export function getAuthentication() {
  return (dispatch) => {
    axios.get(`${API_ROOT_URL}/session`)
      .then((response) => {
        dispatch(signInUserSuccessful(response.data));
      })
      .catch((error) => {
        dispatch(authError(error.response.data.message));
      });
  };
}

export function signOutUser() {
  return (dispatch) => {
    axios.get(`${API_ROOT_URL}/signout`)
      .then(() => {
        dispatch({
          type: ActionsTypes.UNAUTHENTICATE_USER
        });
        dispatch({
          type: ActionsTypes.RESET_PROJECT,
        });
      })
      .catch((error) => dispatch(authError(error.data.error)));
  };
}
