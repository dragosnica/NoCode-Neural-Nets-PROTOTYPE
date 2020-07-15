/* eslint-disable react/destructuring-assignment */
import 'regenerator-runtime/runtime';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PrivateFeatureModal from './modals/PrivateFeatureModal';
import SaveErrorModal from './modals/SaveErrorModal';
import CustomModal from './modals/CustomModal';
import ProjectSaveAsForm from './forms/ProjectSaveAsForm';
import UploadDataForm from './forms/UploadDataForm';
import * as ProjectActions from '../actions/project';
import * as WorkspaceActions from '../actions/workspace';
import * as UserActions from '../../User/actions/user';
import * as ToastActions from '../actions/toast';
import arrowDown from '../../../images/arrow-down.svg';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: 'void',
      buildNetworkErrorModalOpen: false,
      downloadNetworkErrorModalOpen: false,
      uploadDataModalOpen: false,
      saveAsModalOpen: false
    };
    this.clearHideTimeout = this.clearHideTimeout.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusForNew = this.handleFocus.bind(this, 'new');
    this.handleFocusForProject = this.handleFocus.bind(this, 'project');
    this.handleFocusForDownload = this.handleFocus.bind(this, 'download');
    this.handleFocusForUpload = this.handleFocus.bind(this, 'upload');
    this.handleFocusForMode = this.handleFocus.bind(this, 'mode');
    this.handleFocusForHelp = this.handleFocus.bind(this, 'help');
    this.toggleDropdownForNew = this.toggleDropdown.bind(this, 'new');
    this.toggleDropdownForProject = this.toggleDropdown.bind(this, 'project');
    this.toggleDropdownForDownload = this.toggleDropdown.bind(this, 'download');
    this.toggleDropdownForUpload = this.toggleDropdown.bind(this, 'upload');
    this.toggleDropdownForMode = this.toggleDropdown.bind(this, 'mode');
    this.toggleDropdownForHelp = this.toggleDropdown.bind(this, 'help');
    this.handleNewSequential = this.handleNew.bind(this, 'sequential');
    this.handleNewArbitraryGraph = this.handleNew.bind(this, 'model');
    this.handleProjectSave = this.handleProjectSave.bind(this);
    this.handleProjectSaveAs = this.handleProjectSaveAs.bind(this);
    this.hideProjectSaveAsForm = this.hideProjectSaveAsForm.bind(this);
    this.hideDownloadNetworkErrorModal = this.hideDownloadNetworkErrorModal.bind(this);
    this.hideBuildNetworkErrorModal = this.hideBuildNetworkErrorModal.bind(this);
    this.handleDownloadModel = this.handleDownloadModel.bind(this);
    this.handleDownloadResults = this.handleDownloadResults.bind(this);
    this.handleUploadModel = this.handleUploadModel.bind(this);
    this.handleUploadData = this.handleUploadData.bind(this);
    this.hideUploadDataModal = this.hideUploadDataModal.bind(this);
    this.handleModeTrain = this.handleMode.bind(this, 'train');
    this.handleModePredict = this.handleMode.bind(this, 'predict');
    this.handleHelpReference = this.handleHelp.bind(this, 'reference');
    this.handleHelpAbout = this.handleHelp.bind(this, 'about');
    this.handleSignOut = this.handleSignOut.bind(this);
    this.toastTimeout = 2000;

    this.props.startNewNetworkSchema('sequential');
  }

  setDropdown(item) {
    this.setState({
      dropdown: item
    });
  }

  closeDropDown(e) {
    if (e.keyCode === 27) {
      this.setDropdown('void');
    }
  }

  handleFocus(item) {
    this.clearHideTimeout();
    this.setDropdown(item);
  }

  clearHideTimeout() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  handleBlur() {
    this.timer = setTimeout(this.setDropdown.bind(this, 'void'), 10);
  }

  toggleDropdown(item) {
    if (this.state.dropdown === item) {
      this.setDropdown('void');
    } else {
      this.setDropdown(item);
    }
    this.props.setSaveProjectInitiated(false);
    this.props.setSaveAsProjectInitiated(false);
    this.props.setProjectsOpenInitiated(false);
  }

  handleNew(modelType) {
    this.setDropdown('void');
    this.props.startNewNetworkSchema(modelType);
    if (modelType === 'model') {
      this.props.setToastText('New arbitrary graph model started !');
      this.props.displayToast(this.toastTimeout);
    } else {
      this.props.setToastText(`New ${modelType} model started !`);
      this.props.displayToast(this.toastTimeout);
    }
  }

  handleProjectSave() {
    this.props.saveProject(false);
  }

  handleProjectSaveAs() {
    this.setState({
      saveAsModalOpen: true
    });
  }

  hideProjectSaveAsForm() {
    this.setState({
      saveAsModalOpen: false
    });
  }

  handleDownloadModel() {
    if (this.props.projectReducers.model === undefined) {
      if (this.props.projectReducers.networkSchema.layers.length < 2) {
        this.setState({
          buildNetworkErrorModalOpen: true
        });
      } else {
        this.setState({
          downloadNetworkErrorModalOpen: true
        });
      }
    } else {
      this.setDropdown('void');
      this.props.exportModel(
        this.props.projectReducers.model,
        this.props.projectReducers.name
      );
    }
  }

  hideBuildNetworkErrorModal() {
    this.setDropdown('void');
    this.setState({
      buildNetworkErrorModalOpen: false
    });
  }

  hideDownloadNetworkErrorModal() {
    this.setDropdown('void');
    this.setState({
      downloadNetworkErrorModalOpen: false
    });
  }

  // TODO: Implement exportResults()
  handleDownloadResults(item) {
    if (this.props.userReducers.authenticated) {
      console.log('Exporting the results ..');
      this.setDropdown('void');
      // this.props.exportResults(modelType);
    } else {
      this.props.setToastText('Please, sign in first !');
      this.props.displayToast(this.toastTimeout);
    }
  }

  // TODO
  handleUploadModel() {
    if (this.props.userReducers.authenticated) {
      console.log('TODO');
    } else {
      this.props.setToastText('Please, sign in first !');
      this.props.displayToast(this.toastTimeout);
    }
  }


  handleUploadData() {
    this.setState({
      uploadDataModalOpen: true,
    });
  }

  hideUploadDataModal() {
    this.setState({
      uploadDataModalOpen: false,
    });
  }

  handleMode(networkOpMode) {
    this.props.setNetworkOpMode(networkOpMode);
    this.props.setToastText(`Project mode is now '${networkOpMode}' !`);
    this.props.displayToast(this.toastTimeout);
    this.setDropdown('void');
  }

  // TODO
  handleHelp(pageName) {
    if (pageName === 'reference') {
      // GOTO REFERENCE PAGE
    } else {
      // GOTO ABOUT PAGE
    }
  }

  handleSignOut() {
    this.props.signOutUser();
    this.props.setToastText(`See you soon, ${this.props.userReducers.user.username}`);
    this.props.displayToast(this.toastTimeout);
  }

  render() {
    const navDropdownState = {
      new: classNames({
        'nav_item': true,
        'nav_item-open': this.state.dropdown === 'new'
      }),
      project: classNames({
        'nav_item': true,
        'nav_item-open': this.state.dropdown === 'project'
      }),
      download: classNames({
        'nav_item': true,
        'nav_item-open': this.state.dropdown === 'download'
      }),
      upload: classNames({
        'nav_item': true,
        'nav_item-open': this.state.dropdown === 'upload'
      }),
      mode: classNames({
        'nav_item': true,
        'nav_item-open': this.state.dropdown === 'mode'
      }),
      help: classNames({
        'nav_item': true,
        'nav_item-open': this.state.dropdown === 'help'
      })
    };
    return (
      <nav className="nav" title="nav-menu">
        <ul className="nav_items-left" title="project-nav">
          {/* <li className="nav_item">
            LOGO
          </li> */}

          <li className={navDropdownState.new}>
            <button
              type="button"
              className="nav_item_header"
              onClick={this.toggleDropdownForNew}
              onBlur={this.handleBlur}
              onFocus={this.clearHideTimeout}
              onMouseOver={() => {
                if (this.state.dropdown !== 'void') {
                  this.setDropdown('new');
                }
              }}
            >
              <span>New </span>
              <ReactSVG src={arrowDown} wrapper="span" />
            </button>
            <ul className="nav_dropdown">
              <li className="nav_dropdown_item">
                <button
                  type="button"
                  onClick={this.handleNewSequential}
                  onFocus={this.handleFocusForNew}
                  onBlur={this.handleBlur}
                >
                  <span className="nav_dropdown_subitem">
                    Sequential
                  </span>
                </button>
              </li>
              <li className="nav_dropdown_item">
                <button
                  type="button"
                  onClick={this.handleNewArbitraryGraph}
                  onFocus={this.handleFocusForNew}
                  onBlur={this.handleBlur}
                  disabled
                >
                  <span className="nav_dropdown_subitem">
                    Arbitrary graph
                  </span>
                </button>
              </li>
            </ul>
          </li>

          <li className={navDropdownState.project}>
            <button
              type="button"
              className="nav_item_header"
              onClick={this.toggleDropdownForProject}
              onBlur={this.handleBlur}
              onFocus={this.clearHideTimeout}
              onMouseOver={() => {
                if (this.state.dropdown !== 'void') {
                  this.setDropdown('project');
                }
              }}
            >
              <span className="nav_item_header">Project </span>
              <ReactSVG src={arrowDown} wrapper="span" />
            </button>

            {this.props.userReducers.authenticated && (
              <ul className="nav_dropdown">
                <Link to={`/${this.props.userReducers.user.username}/projects`} className="nav_dropdown_link">
                  <li className="nav_dropdown_item">
                    <button
                      type="button"
                      onFocus={this.handleFocusForProject}
                      onBlur={this.handleBlur}
                    >
                      <span className="nav_dropdown_subitem">
                        Open
                      </span>
                    </button>
                  </li>
                </Link>
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForProject}
                    onBlur={this.handleBlur}
                    onClick={this.handleProjectSave}
                  >
                    <span className="nav_dropdown_subitem">
                      Save
                    </span>
                  </button>
                </li>
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForProject}
                    onBlur={this.handleBlur}
                    onClick={this.handleProjectSaveAs}
                  >
                    <span className="nav_dropdown_subitem">
                      Save as
                    </span>
                  </button>
                  <ProjectSaveAsForm
                    hideForm={this.hideProjectSaveAsForm}
                    formState={this.state.saveAsModalOpen}
                  />
                  <SaveErrorModal />
                </li>
              </ul>
            )}

            {!this.props.userReducers.authenticated && (
              <ul className="nav_dropdown">

                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForProject}
                    onBlur={this.handleBlur}
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Open
                      </span>
                    )}
                    />
                  </button>
                </li>

                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForProject}
                    onBlur={this.handleBlur}
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Save
                      </span>
                    )}
                    />
                  </button>
                </li>

                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForProject}
                    onBlur={this.handleBlur}
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Save As
                      </span>
                    )}
                    />
                  </button>
                </li>

              </ul>
            )}

          </li>

          <li className={navDropdownState.download}>
            <button
              type="button"
              className="nav_item_header"
              onClick={this.toggleDropdownForDownload}
              onBlur={this.handleBlur}
              onFocus={this.clearHideTimeout}
              onMouseOver={() => {
                if (this.state.dropdown !== 'void') {
                  this.setDropdown('download');
                }
              }}
            >
              <span className="nav_item_header">Download </span>
              <ReactSVG src={arrowDown} wrapper="span" />
            </button>

            {this.props.userReducers.authenticated && (
              <ul className="nav_dropdown">
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onClick={this.handleDownloadModel}
                    onFocus={this.handleFocusForDownload}
                    onBlur={this.handleBlur}
                  >
                    <span className="nav_dropdown_subitem">
                      Model
                    </span>
                    <CustomModal
                      hideModal={this.hideBuildNetworkErrorModal}
                      modalState={this.state.buildNetworkErrorModalOpen}
                      message="The model must include at least 2 layers !"
                    />
                    <CustomModal
                      hideModal={this.hideDownloadNetworkErrorModal}
                      modalState={this.state.downloadNetworkErrorModalOpen}
                      message={'The network must be built first! '.concat(
                        "Click on the 'Compile network' button on the upper left side of the window."
                      )}
                    />
                  </button>
                </li>
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onClick={this.handleDownloadResults}
                    onFocus={this.handleFocusForDownload}
                    onBlur={this.handleBlur}
                    disabled
                  >
                    <span className="nav_dropdown_subitem">
                      Results
                    </span>
                  </button>
                </li>
              </ul>
            )}

            {!this.props.userReducers.authenticated && (
              <ul className="nav_dropdown">
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForDownload}
                    onBlur={this.handleBlur}
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Model
                      </span>
                    )}
                    />
                  </button>
                </li>
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForDownload}
                    onBlur={this.handleBlur}
                    disabled
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Results
                      </span>
                    )}
                    />
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li className={navDropdownState.upload}>
            <button
              type="button"
              className="nav_item_header"
              onClick={this.toggleDropdownForUpload}
              onBlur={this.handleBlur}
              onFocus={this.clearHideTimeout}
              onMouseOver={() => {
                if (this.state.dropdown !== 'void') {
                  this.setDropdown('upload');
                }
              }}
            >
              <span className="nav_item_header">Upload </span>
              <ReactSVG src={arrowDown} wrapper="span" />
            </button>

            {!this.props.userReducers.authenticated && (
              <ul className="nav_dropdown">
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForUpload}
                    onBlur={this.handleBlur}
                    disabled
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Model
                      </span>
                    )}
                    />
                  </button>
                </li>
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onFocus={this.handleFocusForUpload}
                    onBlur={this.handleBlur}
                  >
                    <PrivateFeatureModal trigger={(
                      <span className="nav_dropdown_subitem">
                        Data
                      </span>
                    )}
                    />
                  </button>
                </li>
              </ul>
            )}

            {this.props.userReducers.authenticated && (
              <ul className="nav_dropdown">
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onClick={this.handleUploadModel}
                    onFocus={this.handleFocusForUpload}
                    onBlur={this.handleBlur}
                    disabled
                  >
                    <span className="nav_dropdown_subitem">
                      Model
                    </span>
                  </button>
                </li>
                <li className="nav_dropdown_item">
                  <button
                    type="button"
                    onClick={this.handleUploadData}
                    onFocus={this.handleFocusForUpload}
                    onBlur={this.handleBlur}
                  >
                    <span className="nav_dropdown_subitem">
                      Data
                    </span>
                  </button>
                  <UploadDataForm
                    formOpen={this.state.uploadDataModalOpen}
                    hideForm={this.hideUploadDataModal}
                  />
                </li>
              </ul>
            )}
          </li>

          <li className={navDropdownState.mode}>
            <button
              type="button"
              className="nav_item_header"
              onClick={this.toggleDropdownForMode}
              onBlur={this.handleBlur}
              onFocus={this.clearHideTimeout}
              onMouseOver={() => {
                if (this.state.dropdown !== 'void') {
                  this.setDropdown('mode');
                }
              }}
            >
              <span className="nav_item_header">Mode </span>
              <ReactSVG className="nav_dropdown_arrow" src={arrowDown} wrapper="span" />
            </button>
            <ul className="nav_dropdown">
              <li className="nav_dropdown_item">
                <button
                  type="button"
                  onClick={this.handleModeTrain}
                  onFocus={this.handleFocusForMode}
                  onBlur={this.handleBlur}
                >
                  <span className="nav_dropdown_subitem">
                    Train
                  </span>
                </button>
              </li>
              <li className="nav_dropdown_item">
                <button
                  type="button"
                  onClick={this.handleModePredict}
                  onFocus={this.handleFocusForMode}
                  onBlur={this.handleBlur}
                  disabled
                >
                  <span className="nav_dropdown_subitem">
                    Predict
                  </span>
                </button>
              </li>
            </ul>
          </li>

          <li className={navDropdownState.help}>
            <button
              type="button"
              className="nav_item_header"
              onClick={this.toggleDropdownForHelp}
              onBlur={this.handleBlur}
              onFocus={this.clearHideTimeout}
              onMouseOver={() => {
                if (this.state.dropdown !== 'void') {
                  this.setDropdown('help');
                }
              }}
            >
              <span className="nav_item_header">Help </span>
              <ReactSVG className="nav_dropdown_arrow" src={arrowDown} wrapper="span" />
            </button>
            <ul className="nav_dropdown">
              <li className="nav_dropdown_item">
                <button
                  type="button"
                  onClick={this.handleHelpReference}
                  onFocus={this.handleFocusForHelp}
                  onBlur={this.handleBlur}
                  disabled
                >
                  <span className="nav_dropdown_subitem">
                    Reference
                  </span>
                </button>
              </li>
              <li className="nav_dropdown_item">
                <button
                  type="button"
                  onClick={this.handleHelpAbout}
                  onFocus={this.handleFocusForHelp}
                  onBlur={this.handleBlur}
                  disabled
                >
                  <span className="nav_dropdown_subitem">
                    About
                  </span>
                </button>
              </li>
            </ul>
          </li>
        </ul>

        {!this.props.userReducers.authenticated && (
          <ul className="nav_items-right" title="user-menu">
            <li className="nav_item">
              <Link to="/signin">
                <button type="button">
                  <span className="nav_item_header">
                    Sign in
                  </span>
                </button>
              </Link>
            </li>
            <p> / </p>
            <li className="nav_item">
              <Link to="/signup">
                <button type="button">
                  <span className="nav_item_header">
                    Register
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        )}

        {this.props.userReducers.authenticated && (
          <ul className="nav_items-right" title="user-menu">
            <li className="nav_item">
              <span className="nav_item_header">
                Authenticated as:
                {' '}
                {this.props.userReducers.user.username}
              </span>
            </li>
            <li className="nav_item">
              <button type="button" onClick={this.handleSignOut}>
                <span className="nav_item_header">
                  Sign out
                </span>
              </button>
            </li>
          </ul>
        )}

      </nav>
    );
  }
}

NavMenu.propTypes = {
  startNewNetworkSchema: PropTypes.func.isRequired,
  exportModel: PropTypes.func.isRequired,
  setNetworkOpMode: PropTypes.func.isRequired,
  setSaveProjectInitiated: PropTypes.func.isRequired,
  setSaveAsProjectInitiated: PropTypes.func.isRequired,
  setProjectsOpenInitiated: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    networkSchema: PropTypes.shape({
      networkType: PropTypes.string,
      layers: PropTypes.array
    }).isRequired,
    model: PropTypes.shape({}),
    projectSavedSuccessfully: PropTypes.bool,
    // projectSaveInitiated: PropTypes.bool,
    // projectSaveAsInitiated: PropTypes.bool,
    // projectsOpenInitiated: PropTypes.bool,
    networkOpMode: PropTypes.string,
  }).isRequired,
  workspaceReducers: PropTypes.shape({
    mode: PropTypes.string
  }).isRequired,
  signOutUser: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  displayToast: PropTypes.func.isRequired,
  setToastText: PropTypes.func.isRequired,
  toastReducers: PropTypes.shape({
    displayToast: PropTypes.bool,
    toastText: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
    workspaceReducers: state.workspaceReducers,
    userReducers: state.userReducers,
    toastReducers: state.toastReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ProjectActions,
      ...WorkspaceActions,
      ...UserActions,
      ...ToastActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
