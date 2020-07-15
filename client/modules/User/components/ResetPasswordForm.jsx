import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderField, onSubmitResetPwFail, validateResetPw } from '../formUtils';
import * as UserActions from '../actions/user';

function ResetPasswordForm(props) {
  const {
    userReducers: {
      authError: {
        resetError
      },
    },
    initiateResetUserPassword, handleSubmit, pristine, submitting, invalid
  } = props;
  return (
    <div className="userForm_container">
      <h2 className="userForm_title">Reset password</h2>
      <form className="userForm_form" onSubmit={handleSubmit(initiateResetUserPassword.bind(this))}>
        <Field name="email" type="text" label="Email used for registration" component={renderField} />
        {resetError && (
          <div>
            <span className="userForm_error">{resetError}</span>
            <br />
          </div>
        )}
        <div className="userForm_label_header">
          <input
            type="submit"
            disabled={pristine || submitting || invalid}
            className="nav_item_header"
            value="Reset password"
          />
        </div>
      </form>
      <span className="userForm_nav">
        <Link to="/signin">
          <button type="button">
            <span className="nav_item_header">
              Sign in here
            </span>
          </button>
        </Link>
        {' '}
        or
        {' '}
        <Link to="/signup">
          <button type="button">
            <span className="nav_item_header">
              Register here
            </span>
          </button>
        </Link>
      </span>
    </div>
  );
}

ResetPasswordForm.propTypes = {
  initiateResetUserPassword: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    authError: PropTypes.shape({
      resetError: PropTypes.string
    }),
    passwordResetInitiated: PropTypes.bool,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

ResetPasswordForm.defaultProps = {
  pristine: true,
  submitting: false,
  invalid: false,
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

export default reduxForm({
  form: 'signin',
  fields: ['username'],
  onSubmitResetPwFail,
  validate: validateResetPw,
})(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm));
