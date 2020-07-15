import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ToastActions from '../actions/toast';

function Toast(props) {
  const { toastReducers } = props;
  const { toastText } = toastReducers;
  const { hideToast } = props;
  return (
    <section className="toast">
      <p>{toastText}</p>
      <button type="button" className="toast_close" onClick={hideToast}>
        <p className="workspace_close_button">&times;</p>
      </button>
    </section>
  );
}

Toast.propTypes = {
  hideToast: PropTypes.func.isRequired,
  toastReducers: PropTypes.shape({
    displayToast: PropTypes.bool,
    toastText: PropTypes.string,
  }).isRequired
};

function mapStateToProps(state) {
  return {
    toastReducers: state.toastReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ToastActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
