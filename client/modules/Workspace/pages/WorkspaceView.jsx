/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CSV from 'csv-string';
import * as tfjsvis from '@tensorflow/tfjs-vis';
import NavMenu from '../components/NavMenu';
import ToolsFrame from '../components/ToolsFrame';
import Editor from '../components/Editor';
import Toast from '../components/Toast';
import Utilities from '../components/Utilities';
import * as ProjectActions from '../actions/project';
import * as WorkspaceActions from '../actions/workspace';
import * as ToastActions from '../actions/toast';
import * as ModelFactory from '../../../../server/lib/modelFactory';
import arrowLeft from '../../../images/arrow-left.svg';
import arrowRight from '../../../images/arrow-right.svg';

class WorkspaceView extends Component {
  constructor(props) {
    super(props);

    if (this.props.location.pathname.match(/projects/)) {
      const { username } = this.props.match.params;
      const projectName = this.props.match.params.project_name;
      this.props.findByNameAndOpenProject(username, projectName)
        .then(() => {
          if (this.props.projectReducers.lastCompiled !== undefined) {
            this.buildAndCompileNetworkAtStartup();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (this.props.location.pathname.match(/files/)) {
        const fileName = this.props.match.params.file_name;
        if (typeof window !== 'undefined') {
          this.props.getProjectFile(
            username,
            projectName,
            fileName
          );
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    if ((this.props.projectReducers.files !== prevProps.projectReducers.files)
      && this.props.location.pathname.match(/files/)) {
      this.props.projectReducers.files.forEach((file) => {
        if (Object.keys(file)[0] === this.props.match.params.file_name) {
          this.openFile = Object.keys(file)[0];
        }
      });
    }

    if ((this.props.projectReducers.openDataset !== prevProps.projectReducers.openDataset)
      && this.props.location.pathname.match(/files/)) {
      this.parsedDataset = CSV.parse(this.props.projectReducers.openDataset);
      tfjsvis.render.table({
        name: this.openFile.replace(this.openFile.match(/(\d+)/)[0].concat('-'), '').concat(
          format(new Date(parseInt(this.openFile.match(/(\d+)/)[0], 10)), ' - dd/MM/y-HH:mm')
        ),
        tab: this.props.projectReducers.name.concat(' - input data')
      }, {
        headers: this.parsedDataset[0],
        values: this.parsedDataset.slice(1)
      });
      // tfjsvis.show.valuesDistribution({
      //   name: 'Values Distribution',
      //   tab: this.props.projectReducers.name.concat(' - input data')
      // }, someTFTensor);
    }

    if (this.props.projectReducers.model) {
      tfjsvis.show.modelSummary({
        name: this.props.projectReducers.name,
        tab: 'Model summary',
      }, this.props.projectReducers.model);
    }
  }

  buildAndCompileNetworkAtStartup() {
    if (this.props.projectReducers.networkSchema.layers.length > 1) {
      const networkSchema = JSON.parse(JSON.stringify(this.props.projectReducers.networkSchema));
      networkSchema.name = this.props.projectReducers.name;
      const newNetworkModel = ModelFactory.createNetwork(networkSchema);

      const possibleOptimizerArgs = ['learningRate', 'momentum', 'useNesterov', 'initialAccumulatorValue',
        'rho', 'epsilon', 'beta1', 'beta2', 'decay', 'centered'];
      const optimizerArgs = {};
      possibleOptimizerArgs.forEach((arg) => {
        if (this.props.projectReducers[arg] !== undefined) {
          optimizerArgs[arg] = this.props.projectReducers[arg];
        }
      });
      const compileArgs = {
        optimizer: this.props.projectReducers.optimizer,
        loss: this.props.projectReducers.loss,
      };
      const args = { compileArgs, optimizerArgs };
      const compiledNewNetworkModel = ModelFactory.compileNetwork(args, newNetworkModel);

      this.props.startNewTFModel(compiledNewNetworkModel);
      this.props.setLastCompiled();
    }
  }

  render() {
    return (
      // <DndProvider backend={Backend}>
      <div id="IDE">
        <Helmet>
          <title>
            NoCode Neural Nets |
            {' '}
            {this.props.projectReducers.name}
          </title>
        </Helmet>
        {this.props.toastReducers.displayToast && <Toast />}
        <NavMenu />
        {this.props.match.params.file_name ? (
          <Utilities
            currentDataFile={this.props.match.params.file_name}
            parsedDataset={this.parsedDataset}
          />
        ) : (
          <Utilities />
        )}
        <div className="workspace">
          <ToolsFrame />
          {
            this.props.workspaceReducers.toolsFrameEnable
              ? (
                <button
                  className="tools_frame_toggling_button"
                  type="button"
                  onClick={this.props.toggleToolsFrame}
                >
                  <ReactSVG src={arrowLeft} />
                </button>
              )
              : (
                <button
                  className="tools_frame_toggling_button-open"
                  type="button"
                  onClick={this.props.toggleToolsFrame}
                >
                  <ReactSVG src={arrowRight} />
                </button>
              )
          }
          <Editor networkModel={this.networkModel} />
        </div>
      </div>
      // </DndProvider>
    );
  }
}

WorkspaceView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      project_name: PropTypes.string,
      username: PropTypes.string,
      file_name: PropTypes.string,
    })
  }).isRequired,
  // findByIdAndOpenProject: PropTypes.func.isRequired,
  findByNameAndOpenProject: PropTypes.func.isRequired,
  getProjectFile: PropTypes.func.isRequired,
  startNewTFModel: PropTypes.func.isRequired,
  setLastCompiled: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    networkSchema: PropTypes.shape({
      networkType: PropTypes.string,
      layers: PropTypes.array
    }).isRequired,
    files: PropTypes.array,
    lastCompiled: PropTypes.string,
    optimizer: PropTypes.string,
    loss: PropTypes.string,
    openDataset: PropTypes.string,
    model: PropTypes.shape({}),
  }).isRequired,
  toggleToolsFrame: PropTypes.func.isRequired,
  workspaceReducers: PropTypes.shape({
    toolsFrameEnable: PropTypes.bool
  }).isRequired,
  userReducers: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  displayToast: PropTypes.func.isRequired,
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
      ...ToastActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceView);
