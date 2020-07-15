import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { renderField, onSubmitNewPwFail, validateNewPw } from '../formUtils';
import * as UserActions from '../actions/user';

function EnterNewPasswordForm(props) {
  const {
    userReducers: {
      authError: {
        resetCodeError,
      },
      passwordResetInitiated,
    },
    validateAndResetUserPassword, handleSubmit, pristine, submitting, invalid
  } = props;
  return (
    <div className="userForm_container">
      <h2 className="userForm_title">Enter new password</h2>
      {passwordResetInitiated && (
        <span className="userForm_confirmation">
          An email has been sent to the address you&apos;ve registered with.
          Please, check the spam folder as well as it may end up there.
        </span>
      )}
      <form className="userForm_form" onSubmit={handleSubmit(validateAndResetUserPassword.bind(this))}>
        <Field name="code" type="string" label="Code received" component={renderField} />
        {resetCodeError && (
          <div>
            <span className="userForm_error">{resetCodeError}</span>
            <br />
          </div>
        )}
        <Field name="newPassword" type="password" label="New password" component={renderField} />
        <Field name="confirmPassword" type="password" label="Confirm password" component={renderField} />
        <div className="userForm_label_header">
          <input
            type="submit"
            disabled={pristine || submitting || invalid}
            className="nav_item_header"
            value="Change password"
          />
        </div>
      </form>
    </div>
  );
}

EnterNewPasswordForm.propTypes = {
  validateAndResetUserPassword: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    authError: PropTypes.shape({
      resetCodeError: PropTypes.string
    }),
    passwordResetInitiated: PropTypes.bool,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

EnterNewPasswordForm.defaultProps = {
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
  form: 'changePassword',
  fields: ['code', 'newPassword', 'confirmPassword'],
  onSubmitNewPwFail,
  validate: validateNewPw,
})(connect(mapStateToProps, mapDispatchToProps)(EnterNewPasswordForm));
