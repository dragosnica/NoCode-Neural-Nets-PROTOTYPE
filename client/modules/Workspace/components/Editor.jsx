/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapInteractionCSS } from 'react-map-interaction';
import LayersInitializer from './LayersInitializer';
import LayersConfig from './LayersConfig';
import NetworkRepresentation from './NetworkRepresentation';
import * as ProjectActions from '../actions/project';
import * as ItemTypes from '../../../constants/itemTypes';
import zoomInSVG from '../../../images/zoom-in.svg';
import zoomOutSVG from '../../../images/zoom-out.svg';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        type: ItemTypes.input,
        options: {
          // shape: 0,
          batchShape: '[0, 1]',
          name: ItemTypes.input,
          dtype: 'float32',
          sparse: false
        },
        renderForm: true,
        renderLayerRemovalConfirmation: false,
        renderMoveLayer: false,
        nodesPositions: [],
        preecedingLayers: []
      },
      inputLayer: {
        type: ItemTypes.inputLayer,
        options: {
          // inputShape: 0,
          // batchSize: 0,
          batchInputShape: '[0, 1]',
          dtype: 'float32',
          sparse: false,
          name: ItemTypes.inputLayer,
        },
        renderForm: true,
        renderLayerRemovalConfirmation: false,
        renderMoveLayer: false,
        nodesPositions: [],
        preecedingLayers: [],
      },
      activation: {
        type: ItemTypes.activation,
        options: {
          activation: 'elu',
          // inputShape: 0,
          // batchInputShape: 0,
          // batchSize: 0,
          name: ItemTypes.activation,
          // trainable: true,
          // weights: 0,
          // inputDType: 'float32'
        },
        renderForm: true,
        renderLayerRemovalConfirmation: false,
        renderMoveLayer: false,
        nodesPositions: [],
        preecedingLayers: [],
      },
      dense: {
        type: ItemTypes.dense,
        options: {
          units: 3,
          activation: 'linear',
          useBias: true,
          kernelInitializer: 'glorotNormal',
          biasInitializer: 'zeros',
          // TODO: by default inputDim should be ??
          // inputDim: 0,
          kernelConstraint: 'null',
          biasConstraint: 'null',
          kernelRegularizer: 'null',
          biasRegularizer: 'null',
          activityRegularizer: 'null',

          // inputShape: 0,
          // batchInputShape: 0,
          // batchSize: 0,
          name: ItemTypes.dense,
          trainable: true,
          // weights: 0,
          // inputDType: 'float32'
        },
        renderForm: true,
        renderLayerRemovalConfirmation: false,
        renderMoveLayer: false,
        nodesPositions: [],
        preecedingLayers: [],
      },
      stageWidth: 500,
      stageHeight: 500,
    };

    this.initializeLayer = this.initializeLayer.bind(this);
    this.checkEditorSize = this.checkEditorSize.bind(this);
  }

  componentDidMount() {
    this.checkEditorSize();
    window.addEventListener('resize', this.checkEditorSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkEditorSize);
  }

  setLayerName(layerId, itemType) {
    const layers = [...this.props.projectReducers.networkSchema.layers];
    const layerIndex = layers.indexOf(layers.filter((layer) => layer[layerId])[0]);
    const layerName = this.generateLayerName(itemType);
    const layerConfig = layers[layerIndex];
    layerConfig[layerId].options.name = layerName;
    this.props.updateAllLayerOptions(layerIndex, layerConfig);
  }

  // setPrecedingLayers() {
  // }

  handleOnDrag(layerId, event, ui) {
    const layers = [...this.props.projectReducers.networkSchema.layers];
    const layerIndex = layers.indexOf(layers.filter((layer) => layer[layerId])[0]);
    const layerConfig = layers[layerIndex];
    layerConfig[layerId].defaultPosition.x += ui.deltaX;
    layerConfig[layerId].defaultPosition.y += ui.deltaY;
  }

  generateLayerName(itemType) {
    for (let nInLayerName = 1; nInLayerName < 200; nInLayerName++) {
      const layerName = itemType.concat(nInLayerName);
      let layerNameExist = false;
      for (let index = 0; index < this.props.projectReducers.networkSchema.layers.length; index++) {
        const currentLayer = this.props.projectReducers.networkSchema.layers[index];
        if (currentLayer[Object.keys(currentLayer)].options.name === layerName) {
          layerNameExist = true;
          break;
        }
      }
      if (layerNameExist === false) {
        return layerName;
      }
    }
    return null;
  }

  initializeLayer(itemType) {
    const layerId = uuid();
    const layerConfig = JSON.parse(JSON.stringify(this.state[itemType]));
    this.props.postLayerToTail(layerId, layerConfig);
    this.setLayerName(layerId, itemType);
    // if (!itemType.includes('input')) {
    //   this.setPrecedingLayers();
    // }
  }

  checkEditorSize() {
    const width = this.editor_map.offsetWidth;
    const height = this.editor_map.offsetHeight;
    this.setState({
      stageWidth: width,
      stageHeight: height
    });
  }

  render() {
    return (
      <div className="editor">
        <h1>
          Editor section. Layers can be initialized by dragging and dropping them in the dedicated area below
        </h1>
        <div className="editor_main">
          <LayersInitializer initializeLayer={this.initializeLayer} />
          <div
            className="editor_map"
            ref={(node) => {
              this.editor_map = node;
            }}
          >
            <MapInteractionCSS
              showControls
              plusBtnContents={(<img src={zoomInSVG} alt="" />)}
              minusBtnContents={(<img src={zoomOutSVG} alt="" />)}
              btnClass="btn-gradient yellow small"
              disablePan
            >
              <NetworkRepresentation
                stageWidth={this.state.stageWidth}
                stageHeight={this.state.stageHeight}
                networkModel={this.props.networkModel}
              />
            </MapInteractionCSS>
          </div>
        </div>
        <div
          className="editor_built_network"
        >
          {process.env.IS_BROWSER && this.props.projectReducers.networkSchema.layers.map((layer, i) => (
            <div key={uuid()}>
              <LayersConfig
                layer={layer}
                layerIndex={i}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  postLayerToTail: PropTypes.func.isRequired,
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
  networkModel: PropTypes.shape({}),
};

Editor.defaultProps = {
  networkModel: {}
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

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
