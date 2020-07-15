/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tfjs from '@tensorflow/tfjs';
import * as tfjsvis from '@tensorflow/tfjs-vis';
import CustomModal from './modals/CustomModal';
import * as ProjectActions from '../actions/project';
import networkFitSVG from '../../../images/barbell.svg';

class FitNetwork extends Component {
  constructor(props) {
    super(props);

    this.metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
    this.container = {
      name: 'show.fitCallbacks',
      tab: 'Training',
      styles: {
        height: '1000px'
      }
    };

    this.state = {
      noDatasetModalOpen: false,
      noModelModalOpen: false,
      noTargetLabelModal: false,
    };

    this.fitNetwork = this.fitNetwork.bind(this);
    this.hideNoDatasetModal = this.hideNoDatasetModal.bind(this);
    this.showNoDatasetModal = this.showNoDatasetModal.bind(this);
    this.hideNoModelModal = this.hideNoModelModal.bind(this);
    this.showNoModelModal = this.showNoModelModal.bind(this);
    this.hideNoTargetLabelModal = this.hideNoTargetLabelModal.bind(this);
    this.showNoTargetLabelModal = this.showNoTargetLabelModal.bind(this);
  }

  hideNoDatasetModal() {
    this.setState({
      noDatasetModalOpen: false
    });
  }

  showNoDatasetModal() {
    this.setState({
      noDatasetModalOpen: true
    });
  }

  hideNoModelModal() {
    this.setState({
      noModelModalOpen: false
    });
  }

  showNoModelModal() {
    this.setState({
      noModelModalOpen: true
    });
  }

  hideNoTargetLabelModal() {
    this.setState({
      noTargetLabelModal: false
    });
  }

  showNoTargetLabelModal() {
    this.setState({
      noTargetLabelModal: true
    });
  }

  async fitNetwork() {
    this.X = [];
    this.Y = [];
    if (this.props.projectReducers.model === undefined) {
      this.setState({
        noModelModalOpen: true
      });
    }
    if (this.props.parsedDataset.length !== 0) {
      if (this.props.currentTargetLabel === 'none') {
        this.setState({
          noTargetLabelModal: true
        });
      }
      this.props.parsedDataset.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          row.forEach((featureLabel, index) => {
            if (featureLabel === this.props.currentTargetLabel) {
              this.YIndex = index;
            }
          });
        } else {
          this.X.push([]);
          row.forEach((feature, featureIndex) => {
            if (featureIndex !== this.YIndex) {
              this.X[rowIndex - 1].push(Number(feature));
            } else {
              this.Y.push(Number(feature));
            }
          });
        }
      });

      this.X = tfjs.tensor(this.X);
      this.Y = tfjs.tensor(this.Y);

      this.callbacks = tfjsvis.show.fitCallbacks(this.container, this.metrics);
      const { model } = this.props.projectReducers;
      model.fit(this.X, this.Y, {
        batchSize: 8,
        epochs: 10,
        shuffle: true,
        callbacks: this.callbacks
      })
        .then(() => {
          this.props.resetModelFitFailed();
          this.props.startNewTFModel(model);
        })
        .catch((fitError) => {
          this.props.setModelFitFailed(fitError.message);
        });
    } else {
      console.log('this.props.parsedDataset.length');
      console.log(this.props.parsedDataset.length);
      this.setState({
        noDatasetModalOpen: true
      });
    }
  }

  render() {
    return (
      <div className="utilities_compile_network_container">
        <CustomModal
          hideModal={this.hideNoModelModal}
          modalState={this.state.noModelModalOpen}
          message="A network model is required to fit the data !"
        />
        <CustomModal
          hideModal={this.hideNoDatasetModal}
          modalState={this.state.noDatasetModalOpen}
          message={'A dataset is required to fit the model on !'.concat(
            '\n Select one from the dataset menu.'
          )}
        />
        <CustomModal
          hideModal={this.hideNoTargetLabelModal}
          modalState={this.state.noTargetLabelModal}
          message={'A target label is required to fit the model !'.concat(
            '\n Select the target label from the dataset menu.'
          )}
        />
        {this.props.projectReducers.errors.fitError !== undefined && (
          <CustomModal
            hideModal={this.props.resetModelFitFailed.bind(this)}
            modalState={this.props.projectReducers.errors.fitError !== undefined}
            message={'Model fit error: '.concat(this.props.projectReducers.errors.fitError)}
          />
        )}
        <button
          type="button"
          className="utilities_compile_network"
          onClick={this.fitNetwork}
        >
          Fit network
          <img src={networkFitSVG} alt="" />
        </button>
      </div>
    );
  }
}

FitNetwork.propTypes = {
  currentTargetLabel: PropTypes.string,
  parsedDataset: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  setModelFitFailed: PropTypes.func.isRequired,
  resetModelFitFailed: PropTypes.func.isRequired,
  startNewTFModel: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    model: PropTypes.any,
    openDataset: PropTypes.string,
    errors: PropTypes.shape({
      fitError: PropTypes.string,
    }),
  }).isRequired,
};

FitNetwork.defaultProps = {
  currentTargetLabel: 'none',
  parsedDataset: []
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
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FitNetwork);
