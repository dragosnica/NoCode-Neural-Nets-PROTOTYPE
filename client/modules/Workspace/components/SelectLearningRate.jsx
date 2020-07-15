import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';
import * as itemTypes from '../../../constants/itemTypes';

function SelectLearningRate(props) {
  const {
    projectReducers: {
      useLearningRate,
      optimizer,
      learningRate,
    },
    setUseLearningRate,
    setLearningRate,
  } = props;

  const handleUseLearningRateOnChange = (event) => {
    setUseLearningRate(event.target.checked);
  };

  const handleLearningRateOnChange = (event) => {
    setLearningRate(Number(event.target.value));
  };

  const useLearningRateCheckboxClass = classNames({
    utilities_form_checkbox_false: !useLearningRate,
    utilities_form_checkbox_true: useLearningRate
  });

  return (
    <div>
      {optimizer
        && (optimizer === itemTypes.adadelta
        || optimizer === itemTypes.adam
        || optimizer === itemTypes.adamax) && (
        <div className="utilities_select_container">
          <p>Use learning rate:</p>
          <input
            className={useLearningRateCheckboxClass}
            name="useLearningRate"
            type="checkbox"
            checked={useLearningRate}
            onChange={handleUseLearningRateOnChange.bind(this)}
          />
          {useLearningRate && (
            <input
              className="utilities_form_input"
              name="learningRate"
              type="number"
              step=".001"
              value={learningRate}
              onChange={handleLearningRateOnChange.bind(this)}
            />
          )}
        </div>
      )}

      {optimizer
      && (optimizer === itemTypes.sgd
      || optimizer === itemTypes.momentum
      || optimizer === itemTypes.adagrad
      || optimizer === itemTypes.rmsprop)
      && useLearningRate && (
        <div className="utilities_select_container">
          <p>Learning rate:</p>
          <input
            className="utilities_form_input"
            name="learningRate"
            type="number"
            step=".001"
            value={learningRate}
            onChange={handleLearningRateOnChange.bind(this)}
          />
        </div>
      )}
    </div>
  );
}

SelectLearningRate.propTypes = {
  setUseLearningRate: PropTypes.func.isRequired,
  setLearningRate: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectLearningRate);
