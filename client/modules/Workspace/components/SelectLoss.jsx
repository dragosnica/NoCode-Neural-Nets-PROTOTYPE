import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';
import * as itemTypes from '../../../constants/itemTypes';

function SelectLoss(props) {
  const {
    setLoss,
    projectReducers: {
      loss
    }
  } = props;

  const handleLossOnChange = (event) => {
    setLoss(event.target.value);
  };

  return (
    <div className="utilities_select_container">
      <p>Loss:</p>
      <select
        id="loss"
        className="utilities_form_input_long"
        name="loss"
        type="string"
        value={loss}
        onChange={handleLossOnChange.bind(this)}
      >
        {!loss && (
          <option value={undefined}>Undefined</option>
        )}
        <option value={itemTypes.absoluteDifference}>Absolute difference</option>
        <option value={itemTypes.cosineDistance}>Cosine distance</option>
        <option value={itemTypes.hingeLoss}>Hinge</option>
        <option value={itemTypes.huberLoss}>Huber</option>
        <option value={itemTypes.logLoss}>Log</option>
        <option value={itemTypes.meanSquaredError}>Mean squared error</option>
        <option value={itemTypes.sigmoidCrossEntropy}>Sigmoid cross entropy</option>
        <option value={itemTypes.softmaxCrossEntropy}>Softmax cross entropy</option>

        {/* These are metrices. I'll have to figure out which ones are useful and in what circumstances */}
        <option value={itemTypes.binaryCrossentropy}>Binary crossentropy</option>
        <option value={itemTypes.binaryAccuracy}>Binary accuracy</option>
        <option value={itemTypes.categoricalCrossentropy}>Categorical crossentropy</option>
        <option value={itemTypes.categoricalAccuracy}>Categorical accuracy</option>
        <option value={itemTypes.cosineProximity}>Cosine proximity</option>
        <option value={itemTypes.meanAbsoluteError}>Mean absolute error</option>
        <option value={itemTypes.meanAbsolutePercentageError}>Mean absolute percentage error</option>
        <option value={itemTypes.precision}>Precision</option>
        <option value={itemTypes.recall}>Recall</option>
        <option value={itemTypes.sparseCategoricalAccuracy}>Sparse categorical accuracy</option>
      </select>
    </div>
  );
}

SelectLoss.propTypes = {
  setLoss: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    loss: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectLoss);
