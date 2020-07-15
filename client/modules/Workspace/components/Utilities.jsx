/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import format from 'date-fns/format';
import classNames from 'classnames';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tfjsvis from '@tensorflow/tfjs-vis';
import CustomModal from './modals/CustomModal';
import SelectNetworkType from './SelectNetworkType';
import SelectOptimizer from './SelectOptimizer';
import SelectLearningRate from './SelectLearningRate';
import SelectLoss from './SelectLoss';
import MomentumOpts from './MomentumOpts';
import AdagradOpts from './AdagradOpts';
import AdadeltaOpts from './AdadeltaOpts';
import AdamOpts from './AdamOpts';
import AdamaxOpts from './AdamaxOpts';
import RMSPropOpts from './RMSPropsOpts';
import CompileNetwork from './CompileNetwork';
import FitNetwork from './FitNetwork';
import * as ProjectActions from '../actions/project';
import * as ToastActions from '../actions/toast';
import * as itemTypes from '../../../constants/itemTypes';
import projectNameEditSVG from '../../../images/pencil.svg';

class Utilities extends Component {
  constructor(props) {
    super(props);
    this.handleProjectNameOnChange = this.handleProjectNameOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleShowVisor = this.handleShowVisor.bind(this);
    this.handleCurrentDataFileOnChange = this.handleCurrentDataFileOnChange.bind(this);
    this.handleCurrentTargetLabelOnChange = this.handleCurrentTargetLabelOnChange.bind(this);
    this.hideRedirectModal = this.hideRedirectModal.bind(this);
    this.approveRedirect = this.approveRedirect.bind(this);
    this.hideCompileOptsModal = this.hideCompileOptsModal.bind(this);
    this.showCompileOptsModal = this.showCompileOptsModal.bind(this);
    this.hideDatasetOptsModal = this.hideDatasetOptsModal.bind(this);
    this.showDatasetOptsModal = this.showDatasetOptsModal.bind(this);

    this.state = {
      currentDataFile: this.props.currentDataFile,
      tempCurrentDataFile: this.props.currentDataFile,
      userApprovedRedirect: false,
      redirectModalOpen: false,
      compileOptsModalOpen: false,
      datasetOptsModalOpen: false,
      currentTargetLabel: 'none'
    };

    if (typeof window !== 'undefined') {
      this.tfjsVisor = tfjsvis.visor();
      this.tfjsVisor.close();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (typeof window !== 'undefined'
    && this.state.userApprovedRedirect
    && (this.state.currentDataFile !== prevState.currentDataFile)) {
      window.location.reload();
    }
  }

  handleProjectNameOnChange(event) {
    this.props.setProjectName(event.target.value);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.resetProjectNameEditingInitiated();
    }
  }

  validateProjectNameChange() {
    if (this.props.projectReducers.name === '') {
      this.props.setProjectName(this.originalProjectName);
    }
  }

  handleShowVisor() {
    this.tfjsVisor.toggle();
  }

  handleCurrentDataFileOnChange(event) {
    this.props.projectReducers.files.forEach((file) => {
      if (Object.keys(file)[0] === event.target.value) {
        this.setState({
          tempCurrentDataFile: Object.keys(file)[0],
          redirectModalOpen: true,
        });
      }
    });
  }

  handleCurrentTargetLabelOnChange(event) {
    this.setState({
      currentTargetLabel: event.target.value
    });
  }

  hideRedirectModal() {
    this.setState({
      redirectModalOpen: false
    });
  }

  approveRedirect() {
    this.setState((state) => ({
      currentDataFile: state.tempCurrentDataFile,
      userApprovedRedirect: true
    }));
  }

  hideCompileOptsModal() {
    this.setState({
      compileOptsModalOpen: false
    });
  }

  showCompileOptsModal() {
    this.setState({
      compileOptsModalOpen: true
    });
  }

  hideDatasetOptsModal() {
    this.setState({
      datasetOptsModalOpen: false
    });
  }

  showDatasetOptsModal() {
    this.setState({
      datasetOptsModalOpen: true
    });
  }

  render() {
    const projectNameContainerClass = classNames({
      'utilities_project_name_container': true,
      'utilities_project_name_container-editing': this.props.projectReducers.nameEditingInitiated
    });
    if ((this.state.currentDataFile !== this.props.currentDataFile) && this.state.userApprovedRedirect) {
      return (
        <div>
          <Redirect
            to={`/${this.props.userReducers.user.username}/projects/${this.props.projectReducers.name}/files/${this.state.currentDataFile}`}
          />
        </div>
      );
    }
    return (
      <div className="utilities">
        <CustomModal
          hideModal={this.hideRedirectModal}
          approveAction={this.approveRedirect}
          modalState={this.state.redirectModalOpen}
          message={'The following action will reload the page ! \n Make sure you save the changes first ! \n'.concat(
            "Close this message by clicking on the 'X' on the top right corner if you haven't saved the progress. \n",
            "Approve the change of dataset by clicking on 'OK'."
          )}
        />
        <button
          type="button"
          className="utilities_compile_network"
          onClick={this.handleShowVisor}
        >
          Toggle visor
        </button>
        <SelectNetworkType />
        <div className="utilities_select_container">
          <button
            type="button"
            className="utilities_compile_network"
            onClick={this.showDatasetOptsModal}
          >
            Dataset menu
          </button>
          <Modal
            isOpen={this.state.datasetOptsModalOpen}
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={false}
            style={{
              content: {
                width: 350,
                height: 250,
              }
            }}
            ariaHideApp={false}
          >
            <div>
              <button
                type="button"
                onClick={this.hideDatasetOptsModal}
                className="utilities_compilation_menu_close"
              >
                &times;
              </button>
              <div className="utilities_compilation_menu_container">
                <span className="utilities_compilation_menu_title">
                  Dataset options:
                </span>
                <div className="utilities_compilation_menu_content">
                  {this.props.projectReducers.files.length !== 0 ? (
                    <div>
                      <p>Dataset:</p>
                      <div>
                        <select
                          id="currentDataFile"
                          className="utilities_form_input"
                          name="currentDataFile"
                          type="string"
                          value={this.state.currentDataFile}
                          onChange={this.handleCurrentDataFileOnChange}
                        >
                          {this.state.currentDataFile === 'none' && (
                            <option value="none">None</option>
                          )}
                          {this.props.projectReducers.files.map((file) => (
                            <option
                              key={uuid()}
                              value={Object.keys(file)[0]}
                            >
                              {Object.keys(file)[0].replace(
                                Object.keys(file)[0].match(/(\d+)/)[0].concat('-'), ''
                              ).concat(
                                format(new Date(parseInt(Object.keys(file)[0].match(/(\d+)/)[0], 10)),
                                  ' - dd/MM/y-HH:mm')
                              )}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <p>Dataset: none</p>
                  )}
                  {this.props.parsedDataset.length !== 0 ? (
                    <div>
                      <p>Target label:</p>
                      <select
                        id="currentTargetLabel"
                        className="utilities_form_input"
                        name="currentTargetLabel"
                        type="string"
                        value={this.state.currentTargetLabel}
                        onChange={this.handleCurrentTargetLabelOnChange}
                      >
                        {this.state.currentTargetLabel === 'none' && (
                          <option value="none">None</option>
                        )}
                        {this.props.parsedDataset[0].map((label) => (
                          <option
                            key={uuid()}
                            value={label}
                          >
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p>Target label: none</p>
                  )}
                </div>
                <div className="upload_data_form_actions">
                  <button
                    type="button"
                    className="upload_data_form_button"
                    onClick={this.hideDatasetOptsModal}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="utilities_compile_network_container">
          <button
            type="button"
            className="utilities_compile_network"
            onClick={this.showCompileOptsModal}
          >
            Compilation menu
          </button>
        </div>
        <Modal
          isOpen={this.state.compileOptsModalOpen}
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
          style={{
            content: {
              width: 350,
              height: 350,
            }
          }}
          ariaHideApp={false}
        >
          <div>
            <button
              type="button"
              onClick={this.hideCompileOptsModal}
              className="utilities_compilation_menu_close"
            >
              &times;
            </button>
            <div className="utilities_compilation_menu_container">
              <span className="utilities_compilation_menu_title">
                Network compilation options:
              </span>
              <div className="utilities_compilation_menu_content">
                <SelectOptimizer />
                <SelectLearningRate />
                {this.props.projectReducers.optimizer === itemTypes.momentum && (
                  <MomentumOpts />
                )}
                {this.props.projectReducers.optimizer === itemTypes.adagrad && (
                  <AdagradOpts />
                )}
                {this.props.projectReducers.optimizer === itemTypes.adadelta && (
                  <AdadeltaOpts />
                )}
                {this.props.projectReducers.optimizer === itemTypes.adam && (
                  <AdamOpts />
                )}
                {this.props.projectReducers.optimizer === itemTypes.adamax && (
                  <AdamaxOpts />
                )}
                {this.props.projectReducers.optimizer === itemTypes.rmsprop && (
                  <RMSPropOpts />
                )}
                <SelectLoss />
              </div>
              <div className="upload_data_form_actions">
                <button
                  type="button"
                  className="upload_data_form_button"
                  onClick={this.hideCompileOptsModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <CompileNetwork />
        <FitNetwork
          currentTargetLabel={this.state.currentTargetLabel}
          parsedDataset={this.props.parsedDataset}
        />
        <div className={projectNameContainerClass}>
          <button
            className="utilities_project_name"
            type="button"
            onClick={() => {
              this.originalProjectName = this.props.projectReducers.name;
              this.props.setProjectNameEditingInitiated();
              setTimeout(() => this.projectNameInput.focus(), 0);
            }}
          >
            <span>{this.props.projectReducers.name}</span>
            <img src={projectNameEditSVG} alt="" />
          </button>
          <input
            type="text"
            className="utilities_project_name_input"
            value={this.props.projectReducers.name}
            onChange={this.handleProjectNameOnChange}
            onKeyPress={this.handleKeyPress}
            onBlur={() => {
              this.validateProjectNameChange();
              this.props.resetProjectNameEditingInitiated();
            }}
            ref={(element) => { this.projectNameInput = element; }}
          />
        </div>
      </div>
    );
  }
}

Utilities.propTypes = {
  currentDataFile: PropTypes.string,
  parsedDataset: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  setProjectNameEditingInitiated: PropTypes.func.isRequired,
  resetProjectNameEditingInitiated: PropTypes.func.isRequired,
  setProjectName: PropTypes.func.isRequired,
  // getProjectFile: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    nameEditingInitiated: PropTypes.bool,
    optimizer: PropTypes.string,
    files: PropTypes.array,
    openDataset: PropTypes.string,
  }).isRequired,
  userReducers: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

Utilities.defaultProps = {
  currentDataFile: 'none',
  parsedDataset: []
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
    userReducers: state.userReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ProjectActions,
      ...ToastActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Utilities);
