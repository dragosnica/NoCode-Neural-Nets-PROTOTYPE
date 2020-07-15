import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import * as UserActions from '../actions/user';
import * as ToastActions from '../../Workspace/actions/toast';
import arrowLeft from '../../../images/arrow-left.svg';

function NavMenu(props) {
  const {
    justLeftSide,
    userReducers: {
      authenticated,
      user
    }
  } = props;

  const toastTimeout = 2000;

  const handleSignOut = () => {
    props.signOutUser();
    props.setToastText(`See you soon, ${user.username}`);
    props.displayToast(toastTimeout);
  };

  return (
    <nav className="nav" title="nav-menu">
      <ul className="nav_items-left" title="project-nav">

        <li className="nav_item">
          LOGO
        </li>

        <li className="nav_item">
          <Link to="/">
            <button type="button" className="nav_item_header">
              <ReactSVG src={arrowLeft} wrapper="span" />
              <span>
                {' '}
                Back to the workspace
              </span>
            </button>
          </Link>
        </li>

      </ul>
      {!justLeftSide && !authenticated && (
        <ul className="nav_items-right" title="user-menu">

          <li className="nav_item">
            <Link to="/signin">
              <button type="button">
                <span className="nav_item_header">
                  Sign in
                </span>
              </button>
            </Link>
          </li>

          <p> / </p>

          <li className="nav_item">
            <Link to="/signup">
              <button type="button">
                <span className="nav_item_header">
                  Register
                </span>
              </button>
            </Link>
          </li>

        </ul>
      )}

      {authenticated && (
        <ul className="nav_items-right" title="user-menu">
          <li className="nav_item">
            <span className="nav_item_header">
              Authenticated as:
              {' '}
              {user.username}
            </span>
          </li>
          <li className="nav_item">
            <button type="button" onClick={handleSignOut.bind(this)}>
              <span className="nav_item_header">
                Sign out
              </span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

NavMenu.propTypes = {
  justLeftSide: PropTypes.bool,
  signOutUser: PropTypes.func.isRequired,
  userReducers: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
  displayToast: PropTypes.func.isRequired,
  setToastText: PropTypes.func.isRequired,
};

NavMenu.defaultProps = {
  justLeftSide: false
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

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
