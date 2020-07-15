/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomModal from './modals/CustomModal';
import * as ProjectActions from '../actions/project';
import * as ToastActions from '../actions/toast';
import * as ModelFactory from '../../../../server/lib/modelFactory';
import projectBuiltSVG from '../../../images/hammer.svg';

class CompileNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildNetworkErrorModal: false,
      compileNetworkNoOptimizerErrorModal: false,
      compileNetworkNoLossErrorModal: false,
    };

    this.buildAndCompileNetwork = this.buildAndCompileNetwork.bind(this);
    this.hideBuildNetworkErrorModal = this.hideBuildNetworkErrorModal.bind(this);
    this.hideCompileNetworkNoOptimizerErrorModal = this.hideCompileNetworkNoOptimizerErrorModal.bind(this);
    this.hideCompileNetworkNoLossErrorModal = this.hideCompileNetworkNoLossErrorModal.bind(this);
  }

  buildAndCompileNetwork() {
    if (this.props.projectReducers.networkSchema.layers.length < 2) {
      this.setState({
        buildNetworkErrorModal: true
      });
    }
    if (!this.props.projectReducers.optimizer) {
      this.setState({
        compileNetworkNoOptimizerErrorModal: true
      });
    }
    if (!this.props.projectReducers.loss) {
      this.setState({
        compileNetworkNoLossErrorModal: true
      });
    }
    if (this.props.projectReducers.networkSchema.layers.length > 1
      && this.props.projectReducers.optimizer
      && this.props.projectReducers.loss) {
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

      this.props.setToastText('The network is now compiled !');
      this.props.displayToast(2000);
    }
  }

  hideBuildNetworkErrorModal() {
    this.setState({
      buildNetworkErrorModal: false
    });
  }

  hideCompileNetworkNoOptimizerErrorModal() {
    this.setState({
      compileNetworkNoOptimizerErrorModal: false
    });
  }

  hideCompileNetworkNoLossErrorModal() {
    this.setState({
      compileNetworkNoLossErrorModal: false
    });
  }

  render() {
    return (
      <div className="utilities_compile_network_container">
        <button
          type="button"
          className="utilities_compile_network"
          onClick={this.buildAndCompileNetwork}
        >
          Compile network
          <img src={projectBuiltSVG} alt="" />
        </button>
        <CustomModal
          hideModal={this.hideBuildNetworkErrorModal}
          modalState={this.state.buildNetworkErrorModal}
          message="The model must include at least 2 layers !"
        />
        <CustomModal
          hideModal={this.hideCompileNetworkNoOptimizerErrorModal}
          modalState={this.state.compileNetworkNoOptimizerErrorModal}
          message={"Can't compile a network without an optimizer ! \n".concat(
            'Select an optimizer from the compilation menu.'
          )}
        />
        <CustomModal
          hideModal={this.hideCompileNetworkNoLossErrorModal}
          modalState={this.state.compileNetworkNoLossErrorModal}
          message={"Can't compile a network without a loss function ! \n".concat(
            'Select a loss function from the compilation menu.'
          )}
        />
      </div>
    );
  }
}

CompileNetwork.propTypes = {
  startNewTFModel: PropTypes.func.isRequired,
  setLastCompiled: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    networkSchema: PropTypes.shape({
      layers: PropTypes.array
    }).isRequired,
    optimizer: PropTypes.string,
    loss: PropTypes.string,
    learningRate: PropTypes.number,
  }).isRequired,
  displayToast: PropTypes.func.isRequired,
  setToastText: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompileNetwork);
