import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';

function SelectNetworkType(props) {
  const {
    projectReducers: {
      networkSchema: {
        networkType,
        layers
      }
    }
  } = props;

  const handleNetworkTypeOnChange = (event) => {
    props.setNetworkType(event.target.value);
    if (layers.length !== 0) {
      const newLayerConfig = layers[0];
      const newLayerId = Object.keys(newLayerConfig)[0];
      const oldLayerName = newLayerConfig[newLayerId].options.name;
      if (event.target.value === 'sequential') {
        const oldLayerShape = newLayerConfig[newLayerId].options.batchShape;
        newLayerConfig[newLayerId].options.batchInputShape = oldLayerShape;
        delete newLayerConfig[newLayerId].options.batchShape;
        newLayerConfig[newLayerId].options.name = 'inputLayer'.concat(oldLayerName.substring(5));
        newLayerConfig[newLayerId].type = 'inputLayer';
      } else {
        const oldLayerShape = newLayerConfig[newLayerId].options.batchInputShape;
        newLayerConfig[newLayerId].options.batchShape = oldLayerShape;
        delete newLayerConfig[newLayerId].options.batchInputShape;
        newLayerConfig[newLayerId].options.name = 'input'.concat(oldLayerName.substring(10));
        newLayerConfig[newLayerId].type = 'input';
      }
      props.updateAllLayerOptions(0, newLayerConfig);
    }
  };

  return (
    <div className="utilities_select_container">
      <p>Network Type:</p>
      <select
        id="networkType"
        className="utilities_form_input"
        name="networkType"
        type="string"
        value={networkType}
        onChange={handleNetworkTypeOnChange.bind(this)}
      >
        <option value="sequential">Sequential</option>
        <option value="model" disabled>Arbitrary graph</option>
      </select>
    </div>
  );
}

SelectNetworkType.propTypes = {
  setNetworkType: PropTypes.func.isRequired,
  updateAllLayerOptions: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    networkSchema: PropTypes.shape({
      networkType: PropTypes.string,
      layers: PropTypes.array
    }).isRequired,
    nameEditingInitiated: PropTypes.bool,
    optimizer: PropTypes.string,
    useLearningRate: PropTypes.bool,
    learningRate: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectNetworkType);
