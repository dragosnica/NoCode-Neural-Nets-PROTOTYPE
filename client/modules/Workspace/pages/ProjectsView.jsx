/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Popup from 'reactjs-popup';
import format from 'date-fns/format';
import Toast from '../components/Toast';
import CustomModal from '../components/modals/CustomModal';
import NavMenu from '../../User/components/NavMenu';
import * as UserActions from '../../User/actions/user';
import * as ProjectActions from '../actions/project';
import * as ProjectsActions from '../actions/projects';
import DeleteSVG from '../../../images/recycle-bin.svg';
import DeleteSVGRed from '../../../images/recycle-bin-red.svg';

class ProjectsView extends Component {
  constructor(props) {
    super(props);
    const {
      getProjectsForUser,
      userReducers: {
        user
      },
    } = this.props;

    this.state = {
      redirectModalOpen: false,
      userApprovedRedirect: false,
      projectNameToRedirectTo: 'none'
    };

    getProjectsForUser(user.username);

    this.hideRedirectModal = this.hideRedirectModal.bind(this);
    this.approveRedirect = this.approveRedirect.bind(this);
  }

  componentDidUpdate() {
    if (typeof window !== 'undefined'
    && this.state.userApprovedRedirect) {
      window.location.reload();
    }
  }

  handleDeleteProjectOnClick(projectID) {
    const {
      deleteProject,
      getProjectsForUser,
      userReducers: {
        user
      },
    } = this.props;

    deleteProject(projectID);
    getProjectsForUser(user.username);
    this.forceUpdate();
  }

  handleOpenProjectRequest(projectName) {
    this.setState({
      redirectModalOpen: true,
      projectNameToRedirectTo: projectName
    });
  }

  hideRedirectModal() {
    this.setState({
      redirectModalOpen: false
    });
  }

  approveRedirect() {
    this.setState({
      userApprovedRedirect: true
    });
  }

  render() {
    const {
      // setProjectID,
      projectsReducers: {
        projects
      },
      userReducers: {
        user,
        authenticated,
      },
      toastReducers: {
        displayToast
      },
    } = this.props;

    if (!authenticated) {
      return (
        <div>
          <Redirect to="/signin" />
        </div>
      );
    }

    if (this.state.userApprovedRedirect) {
      return (
        <div>
          <Redirect
            to={`/${user.username}/projects/${this.state.projectNameToRedirectTo}`}
          />
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>NoCode Neural Nets | My Projects</title>
        </Helmet>
        {displayToast && <Toast />}
        <NavMenu />
        <div>
          <div className="projects_container">
            <h2 className="projects_title">
              Projects
              -
              {' '}
              {user.username}
            </h2>
            <div className="projects_table">
              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Network type</th>
                    <th>Date create</th>
                    <th>Date last updated</th>
                    <th>{' '}</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((project) => (
                    <tr key={uuid()} className="projects_table_row">
                      {this.props.projectReducers.id !== undefined ? (
                        <CustomModal
                          hideModal={this.hideRedirectModal}
                          approveAction={this.approveRedirect}
                          modalState={this.state.redirectModalOpen}
                          message={'The following action will reload the page ! \n'.concat(
                            `Make sure you save the changes in the '${this.props.projectReducers.name}' project first ! \n`,
                            "Close this message by clicking on the 'X' on the ",
                            "top right corner if you haven't saved the progress. \n",
                            `Approve the opening of the '${this.state.projectNameToRedirectTo}' project by clicking on 'OK'.`
                          )}
                        />
                      ) : (
                        <CustomModal
                          hideModal={this.hideRedirectModal}
                          approveAction={this.approveRedirect}
                          modalState={this.state.redirectModalOpen}
                          message={'The following action will reload the page ! \n'.concat(
                            'Make sure you save the changes in the current project first ! \n',
                            "Close this message by clicking on the 'X' on the ",
                            "top right corner if you haven't saved the progress. \n",
                            `Approve the opening of the '${this.state.projectNameToRedirectTo}' project by clicking on 'OK'.`
                          )}
                        />
                      )}
                      <td
                        className="projects_table_link"
                        onClick={this.handleOpenProjectRequest.bind(this, project.name)}
                      >
                        {project.name}
                      </td>
                      <td>{project.networkType}</td>
                      <td>{format(new Date(project.createdAt), 'MMM do, y HH:mm')}</td>
                      <td>{format(new Date(project.lastSaved), 'MMM do, y HH:mm')}</td>
                      <Popup
                        trigger={(
                          <td>
                            <img className="projects_delete_icon" src={DeleteSVG} alt="delete" />
                            <img className="projects_delete_icon_coloured" src={DeleteSVGRed} alt="deleteColoured" />
                          </td>
                        )}
                        position="bottom center"
                        arrow={false}
                        modal
                        closeOnDocumentClick={false}
                        closeOnEscape={false}
                      >
                        {(close) => (
                          <div>
                            <button
                              type="button"
                              onClick={close}
                            >
                              <p className="workspace_close_button">&times;</p>
                            </button>
                            <h3 className="editor_form_title">
                              Are you sure you want to delete project `
                              {project.name}
                              ` ?
                            </h3>
                            <div className="workspace_popup_actions">
                              <li className="nav_item">
                                <button
                                  type="button"
                                  className="workspace_confirmation_large"
                                  onClick={this.handleDeleteProjectOnClick.bind(this, project._id)}
                                >
                                  Confirm
                                </button>
                              </li>
                              <li className="nav_item">
                                <button
                                  type="button"
                                  className="workspace_confirmation_large"
                                  onClick={close}
                                >
                                  Cancel
                                </button>
                              </li>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectsView.propTypes = {
  // setProjectID: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  getProjectsForUser: PropTypes.func.isRequired,
  projectsReducers: PropTypes.shape({
    projects: PropTypes.array
  }).isRequired,
  userReducers: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  toastReducers: PropTypes.shape({
    displayToast: PropTypes.bool,
    toastText: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
    projectsReducers: state.projectsReducers,
    userReducers: state.userReducers,
    toastReducers: state.toastReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...UserActions,
      ...ProjectActions,
      ...ProjectsActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsView);
