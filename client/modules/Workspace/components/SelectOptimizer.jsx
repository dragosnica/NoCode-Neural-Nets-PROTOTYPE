import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';
import * as itemTypes from '../../../constants/itemTypes';

function SelectOptimizer(props) {
  const {
    projectReducers: {
      optimizer
    }
  } = props;

  const handleOptimizerOnChange = (event) => {
    props.setLearningRate(0.001);
    props.setOptimizer(event.target.value);

    if (event.target.value === itemTypes.sgd) {
      props.setUseLearningRate(true);
      props.setMomentum(undefined);
      props.setUseNesterov(undefined);
      props.setInitialAccumulatorValue(undefined);
      props.setRho(undefined);
      props.setEpsilon(undefined);
      props.setBeta1(undefined);
      props.setBeta2(undefined);
      props.setDecay(undefined);
      props.setCentered(undefined);
    }

    if (event.target.value === itemTypes.momentum) {
      props.setUseLearningRate(true);
      props.setMomentum(0.1);
      props.setUseNesterov(false);
      props.setInitialAccumulatorValue(undefined);
      props.setRho(undefined);
      props.setEpsilon(undefined);
      props.setBeta1(undefined);
      props.setBeta2(undefined);
      props.setDecay(undefined);
      props.setCentered(undefined);
    }

    if (event.target.value === itemTypes.adagrad) {
      props.setUseLearningRate(true);
      props.setMomentum(undefined);
      props.setUseNesterov(undefined);
      props.setInitialAccumulatorValue(0.1);
      props.setRho(undefined);
      props.setEpsilon(undefined);
      props.setBeta1(undefined);
      props.setBeta2(undefined);
      props.setDecay(undefined);
      props.setCentered(undefined);
    }

    if (event.target.value === itemTypes.adadelta) {
      props.setUseLearningRate(false);
      props.setMomentum(undefined);
      props.setUseNesterov(undefined);
      props.setInitialAccumulatorValue(undefined);
      props.setRho(0.95);
      props.setEpsilon(0);
      props.setBeta1(undefined);
      props.setBeta2(undefined);
      props.setDecay(undefined);
      props.setCentered(undefined);
    }

    if (event.target.value === itemTypes.adam) {
      props.setUseLearningRate(false);
      props.setMomentum(undefined);
      props.setUseNesterov(undefined);
      props.setInitialAccumulatorValue(undefined);
      props.setRho(undefined);
      props.setEpsilon(0);
      props.setBeta1(0.9);
      props.setBeta2(0.999);
      props.setDecay(undefined);
      props.setCentered(undefined);
    }

    if (event.target.value === itemTypes.adamax) {
      props.setUseLearningRate(false);
      props.setMomentum(undefined);
      props.setUseNesterov(undefined);
      props.setInitialAccumulatorValue(undefined);
      props.setRho(undefined);
      props.setEpsilon(0);
      props.setBeta1(0.9);
      props.setBeta2(0.999);
      props.setDecay(0.0);
      props.setCentered(undefined);
    }

    if (event.target.value === itemTypes.rmsprop) {
      props.setUseLearningRate(true);
      props.setMomentum(0.0);
      props.setUseNesterov(undefined);
      props.setInitialAccumulatorValue(undefined);
      props.setRho(undefined);
      props.setEpsilon(0);
      props.setBeta1(undefined);
      props.setBeta2(undefined);
      props.setDecay(0.9);
      props.setCentered(false);
    }
  };

  return (
    <div className="utilities_select_container">
      <p>Optimizer:</p>
      <select
        id="optimizer"
        className="utilities_form_input"
        name="optimizer"
        type="string"
        onChange={handleOptimizerOnChange.bind(this)}
      >
        {!optimizer && (
          <option value={undefined}>Undefined</option>
        )}
        <option value={itemTypes.sgd}>SGD</option>
        <option value={itemTypes.momentum}>Momentum</option>
        <option value={itemTypes.adagrad}>Adagrad</option>
        <option value={itemTypes.adadelta}>Adadelta</option>
        <option value={itemTypes.adam}>Adam</option>
        <option value={itemTypes.adamax}>Adamax</option>
        <option value={itemTypes.rmsprop}>RMSProp</option>
      </select>
    </div>
  );
}

SelectOptimizer.propTypes = {
  setOptimizer: PropTypes.func.isRequired,
  setUseLearningRate: PropTypes.func.isRequired,
  setLearningRate: PropTypes.func.isRequired,
  setMomentum: PropTypes.func.isRequired,
  setUseNesterov: PropTypes.func.isRequired,
  setInitialAccumulatorValue: PropTypes.func.isRequired,
  setRho: PropTypes.func.isRequired,
  setEpsilon: PropTypes.func.isRequired,
  setBeta1: PropTypes.func.isRequired,
  setBeta2: PropTypes.func.isRequired,
  setDecay: PropTypes.func.isRequired,
  setCentered: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    optimizer: PropTypes.string,
    momentum: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectOptimizer);
