import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';

function AdagradOpts(props) {
  const {
    setInitialAccumulatorValue,
    projectReducers: {
      initialAccumulatorValue,
    }
  } = props;

  const handleInitialAccumulatorValueOnChange = (event) => {
    setInitialAccumulatorValue(Number(event.target.value));
  };

  return (
    <div>
      <div className="utilities_select_container">
        <p>Initial accumulator value:</p>
        <input
          className="utilities_form_input"
          name="initialAccumulatorValue"
          type="number"
          step=".001"
          value={initialAccumulatorValue}
          onChange={handleInitialAccumulatorValueOnChange.bind(this)}
        />
      </div>
    </div>
  );
}

AdagradOpts.propTypes = {
  setInitialAccumulatorValue: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    initialAccumulatorValue: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdagradOpts);
