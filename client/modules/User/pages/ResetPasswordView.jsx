import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import NavMenu from '../components/NavMenu';
import ResetPasswordForm from '../components/ResetPasswordForm';
import * as UserActions from '../actions/user';

function ResetPasswordView(props) {
  const {
    userReducers: {
      passwordResetInitiated,
    },
  } = props;
  if (passwordResetInitiated) {
    return (
      <Redirect to="/new-pw" />
    );
  }
  return (
    <div>
      <Helmet>
        <title>NoCode Neural Nets | Reset password</title>
      </Helmet>
      <NavMenu />
      <div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}

ResetPasswordView.propTypes = {
  userReducers: PropTypes.shape({
    passwordResetInitiated: PropTypes.bool,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    userReducers: state.userReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...UserActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordView);
