import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../actions/project';

function MomentumOpts(props) {
  const {
    setMomentum,
    setUseNesterov,
    projectReducers: {
      momentum,
      useNesterov,
    }
  } = props;

  const handleMomentumOnChange = (event) => {
    setMomentum(Number(event.target.value));
  };

  const handleUseNesterovOnChange = (event) => {
    setUseNesterov(event.target.checked);
  };

  const useNesterovCheckboxClass = classNames({
    utilities_form_checkbox_false: !useNesterov,
    utilities_form_checkbox_true: useNesterov
  });

  return (
    <div>
      <div className="utilities_select_container">
        <p>Momentum:</p>
        <input
          className="utilities_form_input"
          name="momentum"
          type="number"
          step=".01"
          value={momentum}
          onChange={handleMomentumOnChange.bind(this)}
        />
      </div>
      <div className="utilities_select_container">
        <p>Use Nesterov:</p>
        <input
          className={useNesterovCheckboxClass}
          name="useNesterov"
          type="checkbox"
          checked={useNesterov}
          onChange={handleUseNesterovOnChange.bind(this)}
        />
      </div>
    </div>
  );
}

MomentumOpts.propTypes = {
  setMomentum: PropTypes.func.isRequired,
  setUseNesterov: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    momentum: PropTypes.number,
    useNesterov: PropTypes.bool
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

export default connect(mapStateToProps, mapDispatchToProps)(MomentumOpts);
