/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputForm from './forms/InputForm';
import InputLayerForm from './forms/InputLayerForm';
import ActivationForm from './forms/ActivationForm';
import DenseForm from './forms/DenseForm';
import * as ItemTypes from '../../../constants/itemTypes';
import * as ProjectActions from '../actions/project';

class LayersConfig extends Component {
  constructor(props) {
    super(props);
    this.layerIndex = this.props.layerIndex;
    // eslint-disable-next-line prefer-destructuring
    this.layerId = Object.keys(this.props.layer)[0];
    this.layerType = this.props.layer[Object.keys(this.props.layer)].type;
    this.state = {
      layer: this.props.layer,
    };
    this.handleFormOnChangeForBools = this.handleFormOnChangeForBools.bind(this);
    this.handleFormOnChangeForInts = this.handleFormOnChangeForInts.bind(this);
    this.handleFormOnChangeForStrings = this.handleFormOnChangeForStrings.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleFormOnChangeForBools(event) {
    const { checked } = event.target;
    const { name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      layer: {
        ...prevState.layer,
        [this.layerId]: {
          ...prevState.layer[this.layerId],
          options: {
            ...prevState.layer[this.layerId].options,
            [name]: checked
          }
        }
      }
    }));
  }

  handleFormOnChangeForInts(event) {
    const { value } = event.target;
    const { name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      layer: {
        ...prevState.layer,
        [this.layerId]: {
          ...prevState.layer[this.layerId],
          options: {
            ...prevState.layer[this.layerId].options,
            [name]: parseInt(value, 10)
          }
        }
      }
    }));
  }

  handleFormOnChangeForStrings(event) {
    const { value } = event.target;
    const { name } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      layer: {
        ...prevState.layer,
        [this.layerId]: {
          ...prevState.layer[this.layerId],
          options: {
            ...prevState.layer[this.layerId].options,
            [name]: value
          }
        }
      }
    }));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.updateAllLayerOptions(this.layerIndex, this.state.layer);
    this.hideForm();
  }

  hideForm() {
    const layers = [...this.props.projectReducers.networkSchema.layers];
    const layerIndex = layers.indexOf(layers.filter((layer) => layer[this.layerId])[0]);
    const layerConfig = layers[layerIndex];
    layerConfig[this.layerId].renderForm = false;
    this.props.updateAllLayerOptions(layerIndex, layerConfig);
  }

  render() {
    return (
      <Popup
        position="bottom center"
        open={this.state.layer[this.layerId].renderForm}
        arrow={false}
        modal
        contentStyle={{
          width: 300,
        }}
        // overlayStyle={{
        //   zIndex: 99999,
        // }}
        onClose={this.hideForm}
      >
        <div>
          <button
            type="button"
            onClick={this.hideForm}
          >
            <p className="workspace_close_button">&times;</p>
          </button>
          <h3 className="editor_form_title">
            {this.state.layer[Object.keys(this.state.layer)].options.name}
          </h3>
          {this.layerType === ItemTypes.input && (
          // && this.state.layer[this.layerId].renderForm && (
            <InputForm
              // shape={this.state.layer[this.layerId].options.shape}
              batchShape={this.state.layer[this.layerId].options.batchShape}
              // name={this.state.layer[this.layerId].options.name}
              dtype={this.state.layer[this.layerId].options.dtype}
              sparse={this.state.layer[this.layerId].options.sparse}
              handleFormOnChangeForInts={this.handleFormOnChangeForInts}
              handleFormOnChangeForStrings={this.handleFormOnChangeForStrings}
              handleFormOnChangeForBools={this.handleFormOnChangeForBools}
              handleSubmit={this.handleFormSubmit}
            />
          )}
          {this.layerType === ItemTypes.inputLayer && (
          // && this.state.layer[this.layerId].renderForm && (
            <InputLayerForm
              // inputShape={this.state.layer[this.layerId].options.inputShape}
              // batchSize={this.state.layer[this.layerId].options.batchSize}
              batchInputShape={this.state.layer[this.layerId].options.batchInputShape}
              dtype={this.state.layer[this.layerId].options.dtype}
              sparse={this.state.layer[this.layerId].options.sparse}
              // name={this.state.layer[this.layerId].options.name}
              handleFormOnChangeForInts={this.handleFormOnChangeForInts}
              handleFormOnChangeForStrings={this.handleFormOnChangeForStrings}
              handleFormOnChangeForBools={this.handleFormOnChangeForBools}
              handleSubmit={this.handleFormSubmit}
            />
          )}
          {this.layerType === ItemTypes.activation && (
          // && this.state.layer[this.layerId].renderForm && (
            <ActivationForm
              activation={this.state.layer[this.layerId].options.activation}
              // inputShape={this.state.layer[this.layerId].options.inputShape}
              // batchInputShape={this.state.layer[this.layerId].options.batchInputShape}
              // batchSize={this.state.layer[this.layerId].options.batchSize}
              // name={this.state.layer[this.layerId].options.name}
              // trainable={this.state.layer[this.layerId].options.trainable}
              handleFormOnChangeForInts={this.handleFormOnChangeForInts}
              handleFormOnChangeForStrings={this.handleFormOnChangeForStrings}
              handleFormOnChangeForBools={this.handleFormOnChangeForBools}
              handleSubmit={this.handleFormSubmit}
            />
          )}
          {this.layerType === ItemTypes.dense && (
          // && this.state.layer[this.layerId].renderForm && (
            <DenseForm
              units={this.state.layer[this.layerId].options.units}
              activation={this.state.layer[this.layerId].options.activation}
              useBias={this.state.layer[this.layerId].options.useBias}
              kernelInitializer={this.state.layer[this.layerId].options.kernelInitializer}
              biasInitializer={this.state.layer[this.layerId].options.biasInitializer}
              // inputDim={this.state.layer[this.layerId].options.inputDim}
              kernelConstraint={this.state.layer[this.layerId].options.kernelConstraint}
              biasConstraint={this.state.layer[this.layerId].options.biasConstraint}
              kernelRegularizer={this.state.layer[this.layerId].options.kernelRegularizer}
              biasRegularizer={this.state.layer[this.layerId].options.biasRegularizer}
              activityRegularizer={this.state.layer[this.layerId].options.activityRegularizer}
              // inputShape={this.state.layer[this.layerId].options.inputShape}
              // batchInputShape={this.state.layer[this.layerId].options.batchInputShape}
              // batchSize={this.state.layer[this.layerId].options.batchSize}
              name={this.state.layer[this.layerId].options.name}
              trainable={this.state.layer[this.layerId].options.trainable}
              handleFormOnChangeForInts={this.handleFormOnChangeForInts}
              handleFormOnChangeForStrings={this.handleFormOnChangeForStrings}
              handleFormOnChangeForBools={this.handleFormOnChangeForBools}
              handleSubmit={this.handleFormSubmit}
            />
          )}
        </div>
      </Popup>
    );
  }
}

LayersConfig.propTypes = {
  layer: PropTypes.shape({}).isRequired,
  layerIndex: PropTypes.number.isRequired,
  updateAllLayerOptions: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    networkSchema: PropTypes.shape({
      networkType: PropTypes.string,
      layers: PropTypes.array
    }).isRequired,
    model: PropTypes.shape({})
    // model: PropTypes.objectOf(PropTypes.object).isRequired
  }).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(LayersConfig);
