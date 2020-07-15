/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Stage, Layer, Circle
} from 'react-konva';
// import LayersConfig from './LayersConfig';
import * as ProjectActions from '../actions/project';

function LayerRepresentation(props) {
  const { layer } = props;
  const { layerIndex } = props;
  const layerId = Object.keys(layer)[0];
  const layerType = layer[layerId].type;
  let color = '';
  let units = 1;
  if (layerType.indexOf('input') !== -1) {
    color = 'green';
    if (layerType === 'inputLayer') {
      [, units] = JSON.parse(layer[layerId].options.batchInputShape);
    } else {
      [, units] = JSON.parse(layer[layerId].options.batchShape);
    }
  } else {
    color = 'yellow';
    units = layer[layerId].options.units;
  }
  const height = units * 100;
  const unitsArray = [...Array(units + 1).keys()].slice(1);

  const showForm = () => {
    layer[layerId].renderForm = true;
    props.updateAllLayerOptions(layerIndex, layer);
  };
  return (
    <div>
      <button
        style={{ paddingLeft: 20 }}
        type="button"
        onClick={showForm}
      >
        <h4>Modify layer</h4>
      </button>
      <Stage width={100} height={height}>
        <Layer>
          {unitsArray.map((i, _) => (
            <Circle
              key={uuid()}
              x={50}
              y={(50 * i) + (0.2 * (50 * i))}
              width={50}
              height={50}
              fill={color}
              shadowBlur={5}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

LayerRepresentation.propTypes = {
  layer: PropTypes.shape({}).isRequired,
  layerIndex: PropTypes.number.isRequired,
  updateAllLayerOptions: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(LayerRepresentation);
