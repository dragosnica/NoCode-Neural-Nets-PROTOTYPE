import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';

function AdadeltaOpts(props) {
  const {
    setRho,
    setEpsilon,
    projectReducers: {
      rho,
      epsilon
    }
  } = props;

  const handleRhoOnChange = (event) => {
    setRho(Number(event.target.value));
  };

  const handleEpsilonOnChange = (event) => {
    setEpsilon(Number(event.target.value));
  };

  return (
    <div>
      <div className="utilities_select_container">
        <p>Rho:</p>
        <input
          className="utilities_form_input"
          name="rho"
          type="number"
          step=".001"
          value={rho}
          onChange={handleRhoOnChange.bind(this)}
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

AdadeltaOpts.propTypes = {
  setRho: PropTypes.func.isRequired,
  setEpsilon: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    rho: PropTypes.number,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdadeltaOpts);
