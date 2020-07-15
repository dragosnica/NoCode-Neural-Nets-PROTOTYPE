/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Stage, Group, Layer, Circle, Arrow, Text, Image
} from 'react-konva';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';
import * as ItemTypes from '../../../constants/itemTypes';
import * as ItemColors from '../../../constants/itemColors';
import ReLUSVG from '../../../images/Activation_rectified_linear.svg';

function NetworkRepresentation(props) {
  const circleLayers = [ItemTypes.input, ItemTypes.inputLayer, ItemTypes.dense];
  const layers = [...props.projectReducers.networkSchema.layers];
  let currentLayerId = null;
  let currentLayerNodes = 1;
  let currentLayerRepresentation = {};
  const layersRepresentationsData = [];
  const xSpacing = 150;
  const ySpacing = 75;
  let newLayerIndex = 1;

  layers.forEach((currentLayer, currentLayerIndex) => {
    currentLayerId = Object.keys(currentLayer)[0];
    currentLayerRepresentation = {
      name: currentLayer[currentLayerId].options.name,
      type: currentLayer[currentLayerId].type,
      color: '',
      layerNodesPositions: [],
    };
    if (layers[currentLayerIndex + 1] === undefined) {
      currentLayerRepresentation.color = ItemColors.output;
    } else {
      currentLayerRepresentation.color = ItemColors[currentLayerRepresentation.type];
    }
    currentLayerNodes = 1;

    if (currentLayerRepresentation.type === ItemTypes.input) {
      [, currentLayerNodes] = JSON.parse(currentLayer[currentLayerId].options.batchShape);
    } else if (currentLayerRepresentation.type === ItemTypes.inputLayer) {
      [, currentLayerNodes] = JSON.parse(currentLayer[currentLayerId].options.batchInputShape);
    } else if (currentLayerRepresentation.type === ItemTypes.dense) {
      currentLayerNodes = currentLayer[currentLayerId].options.units;
    }

    if (currentLayerNodes === 0) {
      window.alert('The layer must have at least 1 node.');
      currentLayerNodes = 1;
    }

    if (currentLayer[currentLayerId].nodesPositions.length !== 0) {
      [...Array(currentLayerNodes).keys()].forEach((node, nodeIdx) => {
        currentLayerRepresentation.layerNodesPositions.push(
          currentLayer[currentLayerId].nodesPositions[node]
        );
      });
      if (currentLayer[currentLayerId].nodesPositions.length < currentLayerNodes) {
        const aRange = [];
        for (let i = currentLayer[currentLayerId].nodesPositions.length; i <= (currentLayerNodes - 1); i++) {
          aRange.push(i);
        }
        aRange.forEach((leftoverNode, leftoverNodeIndex) => {
          currentLayerRepresentation.layerNodesPositions.splice(leftoverNode, 1, {
            x: currentLayerRepresentation.layerNodesPositions[leftoverNode - 1].x,
            y: currentLayerRepresentation.layerNodesPositions[leftoverNode - 1].y + ySpacing,
          });
        });
      }
    } else {
      [...Array(currentLayerNodes).keys()].forEach((node, _) => {
        currentLayerRepresentation.layerNodesPositions.push({
          x: ((currentLayerIndex + 1) * xSpacing),
          y: ((node + 1) * ySpacing),
        });
      });
    }

    layersRepresentationsData.push(currentLayerRepresentation);
  });

  const Edge = ({ node1, node2 }) => {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    const angle = Math.atan2(-dy, dx);

    const radius = 20;

    const arrowStart = {
      x: node2.x + -radius * Math.cos(angle + Math.PI),
      y: node2.y + radius * Math.sin(angle + Math.PI)
    };

    const arrowEnd = {
      x: node1.x + -radius * Math.cos(angle),
      y: node1.y + radius * Math.sin(angle)
    };

    return (
      <Arrow
        tension={0.2}
        points={[
          arrowStart.x,
          arrowStart.y,
          arrowEnd.x,
          arrowEnd.y
        ]}
        stroke="#000"
        fill="#000"
        strokeWidth={3}
        pointerWidth={6}
      />
    );
  };

  const showForm = (layerIndex) => {
    const layerConfig = layers[layerIndex];
    const layerId = Object.keys(layerConfig)[0];
    layerConfig[layerId].renderForm = true;
    props.updateAllLayerOptions(layerIndex, layerConfig);
  };

  const showRemoveLayerMsg = (layerIndex) => {
    const layerConfig = layers[layerIndex];
    const layerId = Object.keys(layerConfig)[0];
    layerConfig[layerId].renderLayerRemovalConfirmation = true;
    props.updateAllLayerOptions(layerIndex, layerConfig);
  };

  const hideRemoveLayerMsg = (layerIndex) => {
    const layerConfig = layers[layerIndex];
    const layerId = Object.keys(layerConfig)[0];
    layerConfig[layerId].renderLayerRemovalConfirmation = false;
    props.updateAllLayerOptions(layerIndex, layerConfig);
  };

  const showMoveLayer = (layerIndex) => {
    const layerConfig = layers[layerIndex];
    const layerId = Object.keys(layerConfig)[0];
    layerConfig[layerId].renderMoveLayer = true;
    props.updateAllLayerOptions(layerIndex, layerConfig);
  };

  const hideMoveLayer = (layerIndex) => {
    const layerConfig = layers[layerIndex];
    const layerId = Object.keys(layerConfig)[0];
    layerConfig[layerId].renderMoveLayer = false;
    props.updateAllLayerOptions(layerIndex, layerConfig);
  };

  const handlePositionFormOnChange = (event) => {
    newLayerIndex = parseInt(event.target.value, 10);
  };

  const handlePositionFormSubmit = (layerIndex, event) => {
    event.preventDefault();
    hideMoveLayer(layerIndex);
    props.moveLayerToIndex(layerIndex, newLayerIndex);
  };

  const handleOnDragMove = (layerIndex, nodeIndex, event) => {
    layersRepresentationsData[layerIndex].layerNodesPositions.forEach((_, i) => {
      layersRepresentationsData[layerIndex].layerNodesPositions[i].x = event.target.position().x;
      if (i < nodeIndex) {
        layersRepresentationsData[layerIndex].layerNodesPositions[
          i].y = event.target.position().y - (Math.abs(nodeIndex - i) * ySpacing);
      } else if (i > nodeIndex) {
        layersRepresentationsData[layerIndex].layerNodesPositions[
          i].y = event.target.position().y + (Math.abs(nodeIndex - i) * ySpacing);
      } else if (i === nodeIndex) {
        layersRepresentationsData[layerIndex].layerNodesPositions[
          i].y = event.target.position().y;
      }
    });
  };

  const handleOnDragEnd = (layerIndex, event) => {
    const layerConfig = layers[layerIndex];
    const layerId = Object.keys(layerConfig)[0];
    layerConfig[layerId].nodesPositions = layersRepresentationsData[layerIndex].layerNodesPositions;
    props.updateAllLayerOptions(layerIndex, layerConfig);
  };

  return (
    <div>
      <Stage width={props.stageWidth} height={props.stageHeight}>
        {layersRepresentationsData.map((layer, layerIndex) => (
          <Layer key={uuid()} y={30}>
            <Circle
              x={layer.layerNodesPositions[0].x + 40}
              y={layer.layerNodesPositions[0].y - 80}
              width={15}
              height={15}
              fill="#ffffff"
              stroke="#000"
              strokeWidth={1}
            />
            <Text
              text="&times;"
              x={layer.layerNodesPositions[0].x + 34}
              y={layer.layerNodesPositions[0].y - 88}
              fontSize={20}
              onClick={showRemoveLayerMsg.bind(this, layerIndex)}
            />
            <Text
              text={layer.name}
              x={layer.layerNodesPositions[0].x - 30}
              y={layer.layerNodesPositions[0].y - 75}
              textDecoration="underline"
            />
            <Text
              text="Click to modify"
              x={layer.layerNodesPositions[0].x - 30}
              y={layer.layerNodesPositions[0].y - 60}
              onClick={showForm.bind(this, layerIndex)}
            />
            {layer.type !== ItemTypes.inputLayer
            && layer.type !== ItemTypes.input
            && layersRepresentationsData.length > 2 && (
              <Text
                text="Click to swap position"
                x={layer.layerNodesPositions[0].x - 30}
                y={layer.layerNodesPositions[0].y - 45}
                onClick={showMoveLayer.bind(this, layerIndex)}
              />
            )}
            {circleLayers.includes(layer.type) && layer.layerNodesPositions.map((nodePosition, nodeIndex) => (
              <Group key={uuid()}>
                <Circle
                  x={nodePosition.x}
                  y={nodePosition.y}
                  width={50}
                  height={50}
                  fill={layer.color}
                  shadowBlur={5}
                  draggable
                  onDragMove={handleOnDragMove.bind(this, layerIndex, nodeIndex)}
                  onDragEnd={handleOnDragEnd.bind(this, layerIndex)}
                />
                <Group>
                  {layersRepresentationsData[layerIndex + 1] !== undefined
                  && circleLayers.includes(layersRepresentationsData[layerIndex + 1].type)
                  && layersRepresentationsData[layerIndex + 1].layerNodesPositions.map((node2Position, node2Index) => (
                    <Edge key={uuid()} node1={node2Position} node2={nodePosition} />
                  ))}
                </Group>
              </Group>
            ))}
            {/* {layer.type === ItemTypes.activation && (
              <Image image={(<img src={ReLUSVG} alt="" />)} />
            )} */}
          </Layer>
        ))}
      </Stage>
      {layers.map((layer, layerIndex) => (
        <Popup
          key={uuid()}
          position="bottom center"
          open={layer[Object.keys(layer)[0]].renderLayerRemovalConfirmation}
          arrow={false}
          modal
          onClose={hideRemoveLayerMsg.bind(this, layerIndex)}
          closeOnDocumentClick={false}
          closeOnEscape={false}
        >
          <div>
            <button
              type="button"
              onClick={hideRemoveLayerMsg.bind(this, layerIndex)}
            >
              <p className="workspace_close_button">&times;</p>
            </button>
            <h3 className="editor_form_title">
              Are you sure you want to remove layer `
              {layer[Object.keys(layer)[0]].options.name}
              ` ?
            </h3>
            <div className="workspace_popup_actions">
              <li className="nav_item">
                <button
                  type="button"
                  className="workspace_confirmation_large"
                  onClick={props.removeLayer.bind(this, layerIndex)}
                >
                  Confirm
                </button>
              </li>
              <li className="nav_item">
                <button
                  type="button"
                  className="workspace_confirmation_large"
                  onClick={hideRemoveLayerMsg.bind(this, layerIndex)}
                >
                  Cancel
                </button>
              </li>
            </div>
          </div>
        </Popup>
      ))}
      {layers.map((layer, layerIndex) => (
        <Popup
          key={uuid()}
          position="bottom center"
          open={layer[Object.keys(layer)[0]].renderMoveLayer}
          arrow={false}
          modal
          onClose={hideMoveLayer.bind(this, layerIndex)}
          contentStyle={{
            width: 300,
          }}
          closeOnDocumentClick={false}
          closeOnEscape={false}
        >
          <div>
            <button
              type="button"
              onClick={hideMoveLayer.bind(this, layerIndex)}
            >
              <p className="workspace_close_button">&times;</p>
            </button>
            <h3 className="editor_form_title">
              {layer[Object.keys(layer)].options.name}
            </h3>
            <form onSubmit={handlePositionFormSubmit.bind(this, layerIndex)} className="editor_form">
              <label htmlFor="position" className="editor_form_label">
                Move layer `
                {layer[Object.keys(layer)[0]].options.name}
                ` to position:
                <br />
                <select
                  id="position"
                  className="editor_form_input"
                  name="position"
                  type="string"
                  // value={newLayerIndex}
                  onChange={handlePositionFormOnChange}
                >
                  {[...Array(layers.length).keys()].slice(1).map((l) => (
                    <option key={uuid()} value={l}>
                      {l}
                      {' '}
                      -
                      {' '}
                      {layers[l][Object.keys(layers[l])[0]].options.name}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <input type="submit" className="workspace_confirmation_medium" value="Confirm" />
            </form>
          </div>
        </Popup>
      ))}
    </div>
  );
}

NetworkRepresentation.propTypes = {
  removeLayer: PropTypes.func.isRequired,
  moveLayerToIndex: PropTypes.func.isRequired,
  updateAllLayerOptions: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    networkSchema: PropTypes.shape({
      networkType: PropTypes.string,
      layers: PropTypes.array
    }).isRequired,
  }).isRequired,
  stageWidth: PropTypes.number.isRequired,
  stageHeight: PropTypes.number.isRequired,
  networkModel: PropTypes.shape({}).isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(NetworkRepresentation);
