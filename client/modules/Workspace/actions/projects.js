import axios from 'axios';
import * as ActionTypes from '../../../constants/actionTypes';

const API_ROOT_URL = process.env.API_URL;

export function setProjects(projects) {
  return {
    type: ActionTypes.SET_PROJECTS,
    projects,
  };
}

export function setProjectsFailed(error) {
  return {
    type: ActionTypes.SET_PROJECTS_FAILED,
    error,
  };
}

export function getProjectsForUser(username) {
  return (dispatch) => {
    axios.get(`${API_ROOT_URL}/${username}/projects`)
      .then((response) => {
        dispatch(setProjects(response.data));
      })
      .catch((error) => {
        dispatch(setProjectsFailed(error));
      });
  };
}
