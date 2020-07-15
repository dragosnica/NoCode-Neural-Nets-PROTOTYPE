import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderField, onSubmitSigninFail, validateSignin } from '../formUtils';
import * as UserActions from '../actions/user';

function SigninForm(props) {
  const {
    userReducers: {
      authError: {
        userError,
        pwError
      }
    },
    validateAndSignInUser, handleSubmit, pristine, submitting, invalid
  } = props;
  return (
    <div className="userForm_container">
      <h2 className="userForm_title">Signin</h2>
      <form className="userForm_form" onSubmit={handleSubmit(validateAndSignInUser.bind(this))}>
        <Field name="username" type="text" label="Username / Email" component={renderField} />
        {userError && (
          <div>
            <span className="userForm_error">{userError}</span>
            <br />
          </div>
        )}
        <Field name="password" type="password" label="Password" component={renderField} />
        {pwError && (
          <div>
            <span className="userForm_error">{pwError}</span>
            <br />
          </div>
        )}
        <div className="userForm_label_header">
          <input
            type="submit"
            disabled={pristine || submitting || invalid}
            className="nav_item_header"
            value="Sign in"
          />
        </div>
      </form>
      <span className="userForm_nav">
        Forgot your password ?
        {' '}
        <Link to="/reset-pw">
          <button type="button">
            <span className="nav_item_header">
              Reset it here
            </span>
          </button>
        </Link>
      </span>
      <span className="userForm_nav">
        Don&apos;t have an account ?
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

SigninForm.propTypes = {
  validateAndSignInUser: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    authError: PropTypes.shape({
      userError: PropTypes.string,
      pwError: PropTypes.string,
    }),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

SigninForm.defaultProps = {
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
  fields: ['username', 'password',
  // 'confirmPassword'
  ],
  onSubmitSigninFail,
  validate: validateSignin,
})(connect(mapStateToProps, mapDispatchToProps)(SigninForm));
