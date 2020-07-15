/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/user';
import NavMenu from '../components/NavMenu';

class VerificationView extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { search } = location;
    this.tokenToVerify = search.slice(3);
  }

  componentDidMount() {
    if (this.tokenToVerify !== undefined) {
      const { verifyEmail } = this.props;
      verifyEmail(this.tokenToVerify);
    }
  }

  render() {
    const { userReducers } = this.props;
    const { signupVerification } = userReducers;
    return (
      <div>
        <Helmet>
          <title>NoCode Neural Nets | Signup verification</title>
        </Helmet>
        {signupVerification === 'successful' && (
          <NavMenu justLeftSide />
        )}
        <div className="userForm_container">
          <h2 className="userForm_title">Verify your email</h2>
          {signupVerification === 'verifying' && (
            <div className="userForm_label_header">
              <span>Your email is being verifying ...</span>
            </div>
          )}
          {signupVerification === 'successful' && (
            <div className="userForm_label_header">
              <span>Email verified successfully !</span>
            </div>
          )}
          {signupVerification === 'failed' && (
            <div className="userForm_label_header">
              <span>The verification failed !</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

VerificationView.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  verifyEmail: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    signupVerification: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(VerificationView);
