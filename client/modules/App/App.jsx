/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../User/actions/user';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
    document.body.className = this.props.theme;
    this.props.getAuthentication();
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      document.body.className = this.props.theme;
    }
  }

  render() {
    return (
      <div>
        {this.state.isMounted && process.env.NODE_ENV === 'development'}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  getAuthentication: PropTypes.func.isRequired,
  children: PropTypes.element,
  theme: PropTypes.string
};

App.defaultProps = {
  children: null,
  theme: 'light'
};

const mapStateToProps = (state) => ({
  theme: state.preferencesReducers.theme,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...UserActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
