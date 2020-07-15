import axios from 'axios';
import * as ActionTypes from '../../../constants/actionTypes';
import * as ToastActions from './toast';

const API_ROOT_URL = process.env.API_URL;

export function startNewNetworkSchema(networkType) {
  return {
    type: ActionTypes.START_NEW_NETWORK_SCHEMA,
    networkType
  };
}

export function setNetworkType(networkType) {
  return {
    type: ActionTypes.SET_NETWORK_TYPE,
    networkType
  };
}

export function setNetworkOpMode(networkOpMode) {
  return {
    type: ActionTypes.SET_NETWORK_OP_MODE,
    networkOpMode
  };
}

export function setOptimizer(optimizer) {
  return {
    type: ActionTypes.SET_NETWORK_OPTIMIZER,
    optimizer
  };
}

export function setUseLearningRate(useLR) {
  return {
    type: ActionTypes.SET_NETWORK_USE_LR,
    useLR
  };
}

export function setLearningRate(LR) {
  return {
    type: ActionTypes.SET_NETWORK_LR,
    LR
  };
}

export function setMomentum(momentum) {
  return {
    type: ActionTypes.SET_NETWORK_MOMENTUM,
    momentum
  };
}

export function setUseNesterov(useNesterov) {
  return {
    type: ActionTypes.SET_NETWORK_USE_NESTEROV,
    useNesterov
  };
}

export function setInitialAccumulatorValue(initialAccumulatorValue) {
  return {
    type: ActionTypes.SET_NETWORK_INITIAL_ACCUMULATOR_VALUE,
    initialAccumulatorValue
  };
}

export function setRho(rho) {
  return {
    type: ActionTypes.SET_NETWORK_RHO,
    rho
  };
}

export function setEpsilon(epsilon) {
  return {
    type: ActionTypes.SET_NETWORK_EPSILON,
    epsilon
  };
}

export function setBeta1(beta1) {
  return {
    type: ActionTypes.SET_NETWORK_BETA1,
    beta1
  };
}

export function setBeta2(beta2) {
  return {
    type: ActionTypes.SET_NETWORK_BETA2,
    beta2
  };
}

export function setDecay(decay) {
  return {
    type: ActionTypes.SET_NETWORK_DECAY,
    decay
  };
}

export function setCentered(centered) {
  return {
    type: ActionTypes.SET_NETWORK_CENTERED,
    centered
  };
}

export function setLoss(loss) {
  return {
    type: ActionTypes.SET_NETWORK_LOSS,
    loss
  };
}

export function projectUploadError(error) {
  return {
    type: ActionTypes.SET_FILE_UPLOAD_FAILED,
    payload: error
  };
}

export function setProjectFiles(file) {
  return {
    type: ActionTypes.SET_PROJECT_FILES,
    file
  };
}

function setProjectCurrentFile(dataset) {
  return {
    type: ActionTypes.SET_PROJECT_CURRENT_FILE,
    dataset
  };
}

function setGetProjectFilesError(error) {
  return {
    type: ActionTypes.SET_GET_PROJECT_FILES_FAILED,
    payload: error,
  };
}

function resetGetProjectFilesError() {
  return {
    type: ActionTypes.RESET_GET_PROJECT_FILES_FAILED
  };
}

export function getProjectFile(username, projectName, fileName) {
  return (dispatch) => {
    axios.get(`${API_ROOT_URL}/${username}/projects/${projectName}/files/${fileName}`)
      .then((response) => {
        dispatch(setProjectCurrentFile(response.data));
        dispatch(resetGetProjectFilesError());
      })
      .catch((error) => {
        dispatch(setGetProjectFilesError(error.response.data.message));
      });
  };
}

export function postLayerToTail(layerId, layerConfig) {
  return {
    type: ActionTypes.POST_LAYER_TO_TAIL,
    layerId,
    layerConfig
  };
}

export function removeLayer(layerIndex) {
  return {
    type: ActionTypes.REMOVE_LAYER,
    layerIndex
  };
}

export function moveLayerToIndex(layerIndex, newLayerIndex) {
  return {
    type: ActionTypes.MOVE_LAYER_TO_INDEX,
    layerIndex,
    newLayerIndex
  };
}

export function updateAllLayerOptions(layerIndex, layerConfig) {
  return {
    type: ActionTypes.UPDATE_ALL_LAYER_OPTIONS,
    layerIndex,
    layerConfig,
  };
}

export function startNewTFModel(TFModel) {
  return {
    type: ActionTypes.START_NEW_TF_MODEL,
    TFModel
  };
}

export function setSaveProjectInitiated(state) {
  return {
    type: ActionTypes.SET_PROJECT_SAVE_INITIATED,
    state,
  };
}

export function setSaveAsProjectInitiated(state) {
  return {
    type: ActionTypes.SET_PROJECT_SAVE_AS_INITIATED,
    state,
  };
}

export function setProjectID(id) {
  return {
    type: ActionTypes.SET_PROJECT_ID,
    id
  };
}

function projectSaveError(error) {
  return {
    type: ActionTypes.SET_PROJECT_SAVE_FAILED,
    payload: error,
  };
}

export function setProjectSaveSuccessful() {
  return {
    type: ActionTypes.SET_PROJECT_SAVE_SUCCESSFUL
  };
}

export function resetProjectSaveSuccessful() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_PROJECT_SAVE_SUCCESSFUL
    });
  };
}

export function saveProject(newEntry) {
  // newEntry is used for saving an old project with a new name
  // and it's set to 'true' in the SaveAs function
  return (dispatch, getState) => {
    const request = getState();
    if (request.projectReducers.id === undefined || newEntry) {
      dispatch(setSaveAsProjectInitiated(true));
      axios.post(`${API_ROOT_URL}/projects/save`, request)
        .then((response) => {
          dispatch({
            type: ActionTypes.SET_PROJECT_LAST_SAVED_DATE,
            date: response.data.lastSaved
          });
          dispatch(setProjectID(response.data._id));
          dispatch(ToastActions.setToastText(`Project '${response.data.name}' saved !`));
          dispatch(ToastActions.displayToast(2000));
          dispatch(setProjectSaveSuccessful());
          dispatch(setSaveProjectInitiated(false));
          dispatch(setSaveAsProjectInitiated(false));
          dispatch(resetProjectSaveSuccessful());
        })
        .catch((error) => {
          dispatch(projectSaveError(error.response.data.message));
          if (error.response.data.message.projectNameError) {
            dispatch(ToastActions.setToastText(`Project failed to save ! ${error.response.data.message.projectNameError}`));
            dispatch(ToastActions.displayToast(2000));
            dispatch(setSaveProjectInitiated(false));
            dispatch(setSaveAsProjectInitiated(false));
          }
        });
    } else {
      dispatch(setSaveProjectInitiated(true));
      axios.put(`${API_ROOT_URL}/projects/save/${request.projectReducers.id}`, request)
        .then((response) => {
          dispatch({
            type: ActionTypes.SET_PROJECT_LAST_SAVED_DATE,
            date: response.data.lastSaved
          });
          dispatch(ToastActions.setToastText(`Project '${response.data.name}' saved !`));
          dispatch(ToastActions.displayToast(2000));
          dispatch(setProjectSaveSuccessful());
          dispatch(setSaveProjectInitiated(false));
          dispatch(setSaveAsProjectInitiated(false));
          dispatch(resetProjectSaveSuccessful());
        })
        .catch((error) => {
          dispatch(projectSaveError(error.response.data.message));
          if (error.response.data.message.projectNameError) {
            dispatch(ToastActions.setToastText(`Project failed to save ! ${error.response.data.message.projectNameError}`));
            dispatch(ToastActions.displayToast(2000));
            dispatch(setSaveProjectInitiated(false));
            dispatch(setSaveAsProjectInitiated(false));
          }
        });
    }
  };
}

export function setProjectNameEditingInitiated() {
  return {
    type: ActionTypes.SET_PROJECT_NAME_EDITING_INITIATED
  };
}

export function resetProjectNameEditingInitiated() {
  return {
    type: ActionTypes.RESET_PROJECT_NAME_EDITING_INITIATED
  };
}

export function setProjectName(name) {
  return {
    type: ActionTypes.SET_PROJECT_NAME,
    name,
  };
}

export function saveAsProject(formValues) {
  return (dispatch) => {
    dispatch(setProjectName(formValues.projectName));
    dispatch(saveProject(true));
  };
}

export function setProjectsOpenInitiated(state) {
  return {
    type: ActionTypes.SET_PROJECTS_OPEN_INITIATED,
    state,
  };
}

// export function findByIdAndOpenProject() {
//   return (dispatch, getState) => {
//     const state = getState();
//     const {
//       projectReducers: {
//         id
//       },
//     } = state;
//     return axios.get(`${API_ROOT_URL}/projects/${id}`)
//       .then((response) => {
//         dispatch({
//           type: ActionTypes.OPEN_PROJECT_SUCCESSFUL,
//           id: response.data._id,
//           name: response.data.name,
//           networkType: response.data.networkType,
//           layers: response.data.layers,
//           lastSaved: response.data.lastSaved,
//           createdAt: response.data.createdAt,
//           lastCompiled: response.data.lastCompiled,
//           networkOpMode: response.data.networkOpMode,
//           optimizer: response.data.optimizer,
//           useLearningRate: response.data.useLearningRate,
//           learningRate: response.data.learningRate,
//           momentum: response.data.momentum,
//           useNesterov: response.data.useNesterov,
//           initialAccumulatorValue: response.data.initialAccumulatorValue,
//           rho: response.data.rho,
//           epsilon: response.data.epsilon,
//           beta1: response.data.beta1,
//           beta2: response.data.beta2,
//           decay: response.data.decay,
//           centered: response.data.centered,
//           loss: response.data.loss,
//           metrics: response.data.metrics,
//           files: response.data.files,
//         });
//         dispatch(ToastActions.setToastText(`Project '${response.data.name}' opened !`));
//         dispatch(ToastActions.displayToast(2000));
//       })
//       .catch((error) => {
//         dispatch({
//           type: ActionTypes.OPEN_PROJECT_FAILED,
//           payload: error,
//         });
//         dispatch(ToastActions.setToastText('Project failed to open !'));
//         dispatch(ToastActions.displayToast(2000));
//       });
//   };
// }


export function findByNameAndOpenProject(username, projectName) {
  return (dispatch) => axios.get(`${API_ROOT_URL}/${username}/projects/${projectName}`)
    .then((response) => {
      dispatch({
        type: ActionTypes.OPEN_PROJECT_SUCCESSFUL,
        id: response.data._id,
        name: response.data.name,
        networkType: response.data.networkType,
        layers: response.data.layers,
        lastSaved: response.data.lastSaved,
        createdAt: response.data.createdAt,
        lastCompiled: response.data.lastCompiled,
        networkOpMode: response.data.networkOpMode,
        optimizer: response.data.optimizer,
        useLearningRate: response.data.useLearningRate,
        learningRate: response.data.learningRate,
        momentum: response.data.momentum,
        useNesterov: response.data.useNesterov,
        initialAccumulatorValue: response.data.initialAccumulatorValue,
        rho: response.data.rho,
        epsilon: response.data.epsilon,
        beta1: response.data.beta1,
        beta2: response.data.beta2,
        decay: response.data.decay,
        centered: response.data.centered,
        loss: response.data.loss,
        metrics: response.data.metrics,
        files: response.data.files,
      });
      dispatch(ToastActions.setToastText(`Project '${response.data.name}' opened !`));
      dispatch(ToastActions.displayToast(2000));
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.OPEN_PROJECT_FAILED,
        payload: error,
      });
    });
}

export function setProjectDeleteInitiated() {
  return {
    type: ActionTypes.SET_PROJECT_DELETE_INITIATED
  };
}

export function resetProjectDeleteInitiated() {
  return {
    type: ActionTypes.RESET_PROJECT_DELETE_INITIATED
  };
}

export function setProjectDeleteFailed(error) {
  return {
    type: ActionTypes.SET_PROJECT_DELETE_FAILED,
    payload: error
  };
}

export function resetProjectDeleteFailed() {
  return {
    type: ActionTypes.RESET_PROJECT_DELETE_FAILED
  };
}

export function deleteProject(projectID) {
  return (dispatch) => {
    dispatch(setProjectDeleteInitiated());
    axios.delete(`${API_ROOT_URL}/projects/${projectID}/delete`)
      .then((response) => {
        dispatch(resetProjectDeleteInitiated());
        dispatch(ToastActions.setToastText(`Project '${response.data.name}' deleted !`));
        dispatch(ToastActions.displayToast(2000));
      })
      .catch((error) => {
        dispatch(resetProjectDeleteInitiated());
        if (error.response.data.message.userFindError) {
          dispatch(setProjectDeleteFailed(error.response.data.message.userFindError));
        }
        if (error.response.data.message.projectFindError) {
          dispatch(setProjectDeleteFailed(error.response.data.message.projectFindError));
        }
        if (error.response.data.message.projectDeleteError) {
          dispatch(setProjectDeleteFailed(error.response.data.message.projectDeleteError));
        }
        if (!error.response.data.message.userFindError
          && !error.response.data.message.projectFindError
          && !error.response.data.message.projectDeleteError) {
          dispatch(setProjectDeleteFailed(error.response.data.message));
        }
      });
  };
}

export function setLastCompiled() {
  return {
    type: ActionTypes.SET_LAST_COMPILED
  };
}

export function exportModel(model, modelName) {
  model.save(`downloads://${modelName}`);
}

export function setModelFitFailed(fitError) {
  return {
    type: ActionTypes.SET_MODEL_FIT_FAILED,
    payload: fitError
  };
}

export function resetModelFitFailed() {
  return {
    type: ActionTypes.RESET_MODEL_FIT_FAILED,
  };
}
