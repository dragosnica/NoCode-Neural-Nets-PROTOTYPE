/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export function renderField({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) {
  const [hidePw, sethidePw] = useState(true);
  const togglePasswordVisiblity = () => {
    sethidePw(!hidePw);
  };
  return (
    <label htmlFor={label} className="userForm_label">
      <br />
      <div className="userForm_label_header">
        <span>{label}</span>
      </div>
      {(type === 'password') && (
        <div>
          <input
            className="userForm_input"
            {...input}
            placeholder={label}
            type={hidePw ? type : 'text'}
            autoComplete="on"
          />
          <button
            type="button"
            className="userForm_pw_visibility_icon"
            onClick={togglePasswordVisiblity}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      )}
      {(type !== 'password') && (
        <input
          className="userForm_input"
          {...input}
          placeholder={label}
          type={type}
          autoComplete="on"
        />
      )}
      {touched
        && ((error && (
          <div>
            <span className="userForm_error">{error}</span>
            <br />
          </div>
        ))
          || (warning && (
            <div>
              <span className="userForm_error">{warning}</span>
              <br />
            </div>
          )))}
    </label>
  );
}

export function renderSmallField({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) {
  return (
    <label htmlFor={label} className="nav_modal_label">
      <input
        className="nav_modal_input"
        {...input}
        placeholder={label}
        type={type}
        autoComplete="on"
      />
      {touched
        && ((error && (
          <div>
            <span className="userForm_error">{error}</span>
            <br />
          </div>
        ))
        || (warning && (
          <div>
            <span className="userForm_error">{warning}</span>
            <br />
          </div>
        )))}
    </label>
  );
}

export function onSubmitSignupFail(errors) {
  console.log('Submitting a user registration form has failed.');
  console.log(errors);
}

export function validateSignup(formProps) {
  // eslint-disable-next-line max-len
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Please, enter an username';
  } else if (!formProps.username.match(/^.{1,20}$/)) {
    errors.username = 'Username must be less than 20 characters.';
  } else if (!formProps.username.match(/^[a-zA-Z0-9._-]{1,20}$/)) {
    errors.username = 'Username must only consist of numbers, letters, periods, dashes, and underscores.';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email.';
  } else if (
    !formProps.email.match(EMAIL_REGEX)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!formProps.password) {
    errors.password = 'Please, enter a password';
  }
  if (formProps.password && formProps.password.length < 6) {
    errors.password = 'Password must be at least 6 characters !';
  }
  if (!formProps.confirmPassword) {
    errors.confirmPassword = 'Please, enter a password confirmation !';
  }

  if (formProps.password !== formProps.confirmPassword && formProps.confirmPassword) {
    errors.confirmPassword = 'Passwords must match !';
  }

  return errors;
}

export function onSubmitSigninFail(errors) {
  console.log('Submitting a user login form has failed.');
  console.log(errors);
}

export function validateSignin(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = 'Please, enter an username or an email address';
  }

  if (!formProps.password) {
    errors.password = 'Please, enter a password';
  }

  return errors;
}

export function onSubmitResetPwFail(errors) {
  console.log('Submitting a reset password form has failed.');
  console.log(errors);
}

export function validateResetPw(formProps) {
  // eslint-disable-next-line max-len
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please, enter an email address';
  } else if (!formProps.email.match(EMAIL_REGEX)) {
    errors.email = 'Please enter a valid email address.';
  }
  return errors;
}

export function onSubmitNewPwFail(errors) {
  console.log('Submitting a new password form has failed.');
  console.log(errors);
}

export function validateNewPw(formProps) {
  const errors = {};

  if (!formProps.newPassword) {
    errors.newPassword = 'Please, enter a password';
  }
  if (formProps.newPassword && formProps.newPassword.length < 6) {
    errors.newPassword = 'Password must be at least 6 characters !';
  }
  if (!formProps.confirmPassword) {
    errors.confirmPassword = 'Please, enter a password confirmation !';
  }

  if (formProps.newPassword !== formProps.confirmPassword && formProps.confirmPassword) {
    errors.confirmPassword = 'Passwords must match !';
  }
  return errors;
}

export function onSubmitNewProjectNameFail(errors) {
  console.log('Submitting a new project name form has failed.');
  console.log(errors);
}

export function validateNewProjectName(formProps) {
  const errors = {};

  if (!formProps.projectName) {
    errors.projectName = 'Please, enter a project name';
  }
  return errors;
}
