import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';

function RMSPropsOpts(props) {
  const {
    setDecay,
    setMomentum,
    setEpsilon,
    setCentered,
    projectReducers: {
      decay,
      momentum,
      epsilon,
      centered
    }
  } = props;

  const handleDecayOnChange = (event) => {
    setDecay(Number(event.target.value));
  };
  const handleMomentumOnChange = (event) => {
    setMomentum(Number(event.target.value));
  };

  const handleEpsilonOnChange = (event) => {
    setEpsilon(Number(event.target.value));
  };

  const handleCenteredOnChange = (event) => {
    setCentered(event.target.checked);
  };

  const centeredCheckboxClass = classNames({
    utilities_form_checkbox_false: !centered,
    utilities_form_checkbox_true: centered
  });

  return (
    <div>
      <div className="utilities_select_container">
        <p>Decay:</p>
        <input
          className="utilities_form_input"
          name="decay"
          type="number"
          step=".001"
          value={decay}
          onChange={handleDecayOnChange.bind(this)}
        />
      </div>
      <div className="utilities_select_container">
        <p>Momentum:</p>
        <input
          className="utilities_form_input"
          name="momentum"
          type="number"
          step=".001"
          value={momentum}
          onChange={handleMomentumOnChange.bind(this)}
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
      <div className="utilities_select_container">
        <p>Centered:</p>
        <input
          className={centeredCheckboxClass}
          name="centered"
          type="checkbox"
          checked={centered}
          onChange={handleCenteredOnChange.bind(this)}
        />
      </div>
    </div>
  );
}

RMSPropsOpts.propTypes = {
  setDecay: PropTypes.func.isRequired,
  setMomentum: PropTypes.func.isRequired,
  setEpsilon: PropTypes.func.isRequired,
  setCentered: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    decay: PropTypes.number,
    momentum: PropTypes.number,
    epsilon: PropTypes.number,
    centered: PropTypes.bool,
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

export default connect(mapStateToProps, mapDispatchToProps)(RMSPropsOpts);
