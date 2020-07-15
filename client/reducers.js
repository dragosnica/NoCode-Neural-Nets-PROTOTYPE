import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import workspaceReducers from './modules/Workspace/reducers/workspace';
import preferencesReducers from './modules/Workspace/reducers/preferences';
import projectReducers from './modules/Workspace/reducers/project';
import projectsReducers from './modules/Workspace/reducers/projects';
import toastReducers from './modules/Workspace/reducers/toast';
import userReducers from './modules/User/reducers/user';

const rootReducer = combineReducers({
  form,
  workspaceReducers,
  preferencesReducers,
  projectReducers,
  projectsReducers,
  toastReducers,
  userReducers,
});

export default rootReducer;
