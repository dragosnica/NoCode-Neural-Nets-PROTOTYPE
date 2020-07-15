import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';

function AdamOpts(props) {
  const {
    setBeta1,
    setBeta2,
    setEpsilon,
    projectReducers: {
      beta1,
      beta2,
      epsilon
    }
  } = props;

  const handleBeta1OnChange = (event) => {
    setBeta1(Number(event.target.value));
  };

  const handleBeta2OnChange = (event) => {
    setBeta2(Number(event.target.value));
  };

  const handleEpsilonOnChange = (event) => {
    setEpsilon(Number(event.target.value));
  };

  return (
    <div>
      <div className="utilities_select_container">
        <p>Beta1:</p>
        <input
          className="utilities_form_input"
          name="beta1"
          type="number"
          step=".001"
          value={beta1}
          onChange={handleBeta1OnChange.bind(this)}
        />
      </div>
      <div className="utilities_select_container">
        <p>Beta2:</p>
        <input
          className="utilities_form_input"
          name="beta2"
          type="number"
          step=".001"
          value={beta2}
          onChange={handleBeta2OnChange.bind(this)}
        />
      </div>
      <div className="utilities_select_container">
        <p>Epsilon:</p>
        <input
          className="utilities_form_input"
          name="epsilon"
          type="number"
          step=".001"
          value={epsilon}
          onChange={handleEpsilonOnChange.bind(this)}
        />
      </div>
    </div>
  );
}

AdamOpts.propTypes = {
  setBeta1: PropTypes.func.isRequired,
  setBeta2: PropTypes.func.isRequired,
  setEpsilon: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    beta1: PropTypes.number,
    beta2: PropTypes.number,
    epsilon: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdamOpts);
