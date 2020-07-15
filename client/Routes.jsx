import React from 'react';
import { Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import App from './modules/App/App';
import WorkspaceView from './modules/Workspace/pages/WorkspaceView';
import ProjectsView from './modules/Workspace/pages/ProjectsView';
import SignupView from './modules/User/pages/SignupView';
import SigninView from './modules/User/pages/SigninView';
import VerificationView from './modules/User/pages/VerificationView';
import ResetPasswordView from './modules/User/pages/ResetPasswordView';
import EnterNewPasswordView from './modules/User/pages/EnterNewPasswordView';

function Routes(store) {
  return (
    <DndProvider backend={Backend}>
      <div id="app">
        <Route path="/" component={App} />
        <Route exact path="/" component={WorkspaceView} />
        <Route exact path="/:username/projects" component={ProjectsView} />
        <Route exact path="/:username/projects/:project_name" component={WorkspaceView} />
        <Route exact path="/:username/projects/:project_name/files/:file_name" component={WorkspaceView} />
        <Route path="/signup" component={SignupView} />
        <Route path="/signin" component={SigninView} />
        <Route path="/verify" component={VerificationView} />
        <Route path="/reset-pw" component={ResetPasswordView} />
        <Route path="/new-pw" component={EnterNewPasswordView} />
      </div>
    </DndProvider>
  );
}

export default Routes;
