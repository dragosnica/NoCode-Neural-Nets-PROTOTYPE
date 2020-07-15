/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderField, onSubmitSignupFail, validateSignup } from '../formUtils';
import * as UserActions from '../actions/user';

function SignupForm(props) {
  const {
    userReducers: {
      authError: {
        userError,
        emailError
      }
    },
    validateAndSignUpUser, handleSubmit, pristine, submitting, invalid
  } = props;
  return (
    <div className="userForm_container">
      <h2 className="userForm_title">Register</h2>
      <form className="userForm_form" onSubmit={handleSubmit(validateAndSignUpUser.bind(this))}>
        <Field name="username" type="text" label="Username" component={renderField} />
        {userError && (
          <div>
            <span className="userForm_error">{userError}</span>
            <br />
          </div>
        )}
        <Field name="email" type="text" label="Email" component={renderField} />
        {emailError && (
          <div>
            <span className="userForm_error">{emailError}</span>
            <br />
          </div>
        )}
        <Field name="password" type="password" label="Password" component={renderField} />
        <Field name="confirmPassword" type="password" label="Confirm password" component={renderField} />
        <div className="userForm_label_header">
          <input
            type="submit"
            disabled={pristine || submitting || invalid}
            className="nav_item_header"
            value="Sign up"
          />
        </div>
      </form>
      <span className="userForm_nav">
        Already have an account ?
        {' '}
        <Link to="/signin">
          <button type="button">
            <span className="nav_item_header">
              Signin here
            </span>
          </button>
        </Link>
      </span>
    </div>
  );
}

SignupForm.propTypes = {
  validateAndSignUpUser: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    authError: PropTypes.shape({
      userError: PropTypes.string,
      emailError: PropTypes.string,
    }),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

SignupForm.defaultProps = {
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
  form: 'signup',
  fields: ['username', 'email', 'password', 'confirmPassword'],
  onSubmitSignupFail,
  validate: validateSignup,
  asyncBlurFields: ['username'],
})(connect(mapStateToProps, mapDispatchToProps)(SignupForm));
