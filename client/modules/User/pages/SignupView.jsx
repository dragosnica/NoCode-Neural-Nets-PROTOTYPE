import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavMenu from '../components/NavMenu';
import SignupForm from '../components/SignupForm';
import Toast from '../../Workspace/components/Toast';
import * as UserActions from '../actions/user';
import * as ToastActions from '../../Workspace/actions/toast';

function SignupView(props) {
  const { userReducers } = props;
  const { authenticated } = userReducers;
  if (authenticated) {
    props.setToastText(`Welcome, ${props.userReducers.user.username} !`);
    props.displayToast(2000);
    return (
      <div>
        {props.toastReducers.displayToast && <Toast />}
        <Redirect to="/" />
      </div>
    );
  }
  return (
    <div>
      <Helmet>
        <title>NoCode Neural Nets | Signup</title>
      </Helmet>
      <NavMenu />
      <div>
        <SignupForm />
      </div>
    </div>
  );
}

SignupView.propTypes = {
  userReducers: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  displayToast: PropTypes.func.isRequired,
  setToastText: PropTypes.func.isRequired,
  toastReducers: PropTypes.shape({
    displayToast: PropTypes.bool,
    toastText: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    userReducers: state.userReducers,
    toastReducers: state.toastReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...UserActions,
      ...ToastActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupView);
