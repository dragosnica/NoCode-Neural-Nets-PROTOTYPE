/* eslint-disable no-new-object */
import * as ActionsTypes from '../../../constants/actionTypes';

const preloadedState = {
  id: undefined,
  name: 'new_model',
  networkSchema: {
    networkType: '',
    layers: []
  },
  lastSaved: '',
  createdAt: '',
  lastCompiled: '',
  projectSaveInitiated: false,
  projectSaveAsInitiated: false,
  projectsOpenInitiated: false,
  errors: {},
  networkOpMode: 'train',
  files: [],
};

const project = (state = preloadedState, action) => {
  const newLayers = state.networkSchema.layers;
  const layerToPost = new Object();
  let tempLayer = null;
  const currentFiles = state.files;
  switch (action.type) {
    case ActionsTypes.START_NEW_NETWORK_SCHEMA:
      return {
        id: undefined,
        name: 'new_model',
        networkSchema: {
          networkType: action.networkType,
          layers: []
        },
        lastSaved: '',
        createdAt: '',
        lastCompiled: '',
        projectSaveInitiated: false,
        projectSaveAsInitiated: false,
        projectsOpenInitiated: false,
        errors: {},
        networkOpMode: 'train',
        files: [],
      };
    case ActionsTypes.SET_NETWORK_TYPE:
      return {
        ...state,
        networkSchema: {
          ...state.networkSchema,
          networkType: action.networkType
        }
      };
    case ActionsTypes.SET_NETWORK_OP_MODE:
      return {
        ...state,
        networkOpMode: action.networkOpMode
      };
    case ActionsTypes.SET_NETWORK_OPTIMIZER:
      return {
        ...state,
        optimizer: action.optimizer
      };
    case ActionsTypes.SET_NETWORK_USE_LR:
      return {
        ...state,
        useLearningRate: action.useLR
      };
    case ActionsTypes.SET_NETWORK_LR:
      return {
        ...state,
        learningRate: action.LR
      };
    case ActionsTypes.SET_NETWORK_MOMENTUM:
      return {
        ...state,
        momentum: action.momentum
      };
    case ActionsTypes.SET_NETWORK_USE_NESTEROV:
      return {
        ...state,
        useNesterov: action.useNesterov
      };
    case ActionsTypes.SET_NETWORK_INITIAL_ACCUMULATOR_VALUE:
      return {
        ...state,
        initialAccumulatorValue: action.initialAccumulatorValue
      };
    case ActionsTypes.SET_NETWORK_RHO:
      return {
        ...state,
        rho: action.rho
      };
    case ActionsTypes.SET_NETWORK_EPSILON:
      return {
        ...state,
        epsilon: action.epsilon
      };
    case ActionsTypes.SET_NETWORK_BETA1:
      return {
        ...state,
        beta1: action.beta1
      };
    case ActionsTypes.SET_NETWORK_BETA2:
      return {
        ...state,
        beta2: action.beta2
      };
    case ActionsTypes.SET_NETWORK_DECAY:
      return {
        ...state,
        decay: action.decay
      };
    case ActionsTypes.SET_NETWORK_CENTERED:
      return {
        ...state,
        centered: action.centered
      };
    case ActionsTypes.SET_NETWORK_LOSS:
      return {
        ...state,
        loss: action.loss
      };
    case ActionsTypes.SET_PROJECT_FILES:
      currentFiles.push(action.file);
      return {
        ...state,
        files: currentFiles,
      };
    case ActionsTypes.SET_PROJECT_CURRENT_FILE:
      return {
        ...state,
        openDataset: action.dataset,
      };
    case ActionsTypes.OPEN_PROJECT_SUCCESSFUL:
      return {
        id: action.id,
        name: action.name,
        networkSchema: {
          networkType: action.networkType,
          layers: action.layers
        },
        lastSaved: action.lastSaved,
        createdAt: action.createdAt,
        lastCompiled: action.lastCompiled,
        projectSaveInitiated: false,
        projectSaveAsInitiated: false,
        projectsOpenInitiated: false,
        errors: {},
        networkOpMode: 'train',
        optimizer: action.optimizer,
        useLearningRate: action.useLearningRate,
        learningRate: action.learningRate,
        momentum: action.momentum,
        useNesterov: action.useNesterov,
        initialAccumulatorValue: action.initialAccumulatorValue,
        rho: action.rho,
        epsilon: action.epsilon,
        beta1: action.beta1,
        beta2: action.beta2,
        decay: action.decay,
        centered: action.centered,
        loss: action.loss,
        metrics: action.metrics,
        files: action.files,
      };
    case ActionsTypes.OPEN_PROJECT_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          openProjectError: action.payload
        }
      };
    case ActionsTypes.RESET_PROJECT:
      return preloadedState;
    case ActionsTypes.POST_LAYER_TO_TAIL:
      layerToPost[action.layerId] = action.layerConfig;
      newLayers.push(layerToPost);
      return {
        ...state,
        networkSchema: {
          ...state.networkSchema,
          layers: newLayers
        }
      };
    case ActionsTypes.REMOVE_LAYER:
      newLayers.splice(action.layerIndex, 1);
      return {
        ...state,
        networkSchema: {
          ...state.networkSchema,
          layers: newLayers
        }
      };
    case ActionsTypes.MOVE_LAYER_TO_INDEX:
      tempLayer = newLayers.splice(action.layerIndex, 1);
      newLayers.splice(action.newLayerIndex, 0, tempLayer[0]);
      return {
        ...state,
        networkSchema: {
          ...state.networkSchema,
          layers: newLayers
        }
      };
    case ActionsTypes.UPDATE_ALL_LAYER_OPTIONS:
      newLayers.splice(action.layerIndex, 1);
      newLayers.splice(action.layerIndex, 0, action.layerConfig);
      return {
        ...state,
        networkSchema: {
          ...state.networkSchema,
          layers: newLayers
        }
      };
    case ActionsTypes.START_NEW_TF_MODEL:
      return {
        ...state,
        model: action.TFModel,
      };
    case ActionsTypes.SET_PROJECT_SAVE_SUCCESSFUL:
      return {
        ...state,
        projectSavedSuccessfully: true,
      };
    case ActionsTypes.RESET_PROJECT_SAVE_SUCCESSFUL:
      return {
        ...state,
        projectSavedSuccessfully: undefined,
      };
    case ActionsTypes.SET_PROJECT_SAVE_FAILED:
      return {
        ...state,
        projectSavedSuccessfully: false,
        errors: action.payload,
      };
    case ActionsTypes.SET_PROJECT_SAVE_INITIATED:
      return {
        ...state,
        projectSaveInitiated: action.state,
      };
    case ActionsTypes.SET_PROJECT_SAVE_AS_INITIATED:
      return {
        ...state,
        projectSaveAsInitiated: action.state,
      };
    case ActionsTypes.SET_PROJECT_LAST_SAVED_DATE:
      return {
        ...state,
        lastSaved: action.date,
      };
    case ActionsTypes.SET_PROJECT_DELETE_INITIATED:
      return {
        ...state,
        projectDeleteInitiated: true,
      };
    case ActionsTypes.RESET_PROJECT_DELETE_INITIATED:
      return {
        ...state,
        projectDeleteInitiated: false,
      };
    case ActionsTypes.SET_PROJECT_DELETE_FAILED:
      return {
        ...state,
        projectDeleteFailed: true,
        errors: action.payload,
      };
    case ActionsTypes.RESET_PROJECT_DELETE_FAILED:
      return {
        ...state,
        projectDeleteFailed: false,
        errors: {}
      };
    case ActionsTypes.SET_PROJECT_ID:
      return {
        ...state,
        id: action.id,
      };
    case ActionsTypes.SET_PROJECTS_OPEN_INITIATED:
      return {
        ...state,
        projectsOpenInitiated: action.state,
      };
    case ActionsTypes.SET_PROJECT_NAME:
      return {
        ...state,
        name: action.name,
      };
    case ActionsTypes.SET_PROJECT_NAME_EDITING_INITIATED:
      return {
        ...state,
        nameEditingInitiated: true
      };
    case ActionsTypes.RESET_PROJECT_NAME_EDITING_INITIATED:
      return {
        ...state,
        nameEditingInitiated: false
      };
    case ActionsTypes.SET_FILE_UPLOAD_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          fileUploadError: action.payload
        }
      };
    case ActionsTypes.SET_FILE_UPLOAD_PERCENTAGE:
      return {
        ...state,
        percentCompleted: action.percentCompleted
      };
    case ActionsTypes.SET_LAST_COMPILED:
      return {
        ...state,
        lastCompiled: JSON.stringify(Date.now())
      };
    case ActionsTypes.SET_GET_PROJECT_FILES_FAILED:
      return {
        ...state,
        errors: action.payload,
      };
    case ActionsTypes.RESET_GET_PROJECT_FILES_FAILED:
      return {
        ...state,
        errors: {}
      };
    case ActionsTypes.SET_MODEL_FIT_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          fitError: action.payload
        }
      };
    case ActionsTypes.RESET_MODEL_FIT_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          fitError: undefined
        }
      };
    default:
      return state;
  }
};

export default project;
