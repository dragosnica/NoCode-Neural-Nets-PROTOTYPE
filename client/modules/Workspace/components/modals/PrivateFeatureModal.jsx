/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../../actions/project';

class PrivateFeatureModal extends Component {
  constructor(props) {
    super(props);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleOnClose() {
    const {
      setSaveProjectInitiated,
      setSaveAsProjectInitiated,
      setProjectsOpenInitiated,
    } = this.props;
    setSaveProjectInitiated(false);
    setSaveAsProjectInitiated(false);
    setProjectsOpenInitiated(false);
  }

  render() {
    return (
      <Popup
        trigger={this.props.trigger}
        position="bottom center"
        arrow={false}
        modal
        contentStyle={{
          width: 320,
        }}
        onClose={this.handleOnClose}
        closeOnDocumentClick={false}
        closeOnEscape={false}
      >
        {(close) => (
          <div>
            <p onClick={close} className="workspace_close_button">&times;</p>
            <h3 className="editor_form_title">
              Please, sign in first !
            </h3>
            <div className="workspace_popup_actions">
              <p
                className="workspace_confirmation_small"
                onClick={close}
              >
                OK
              </p>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

PrivateFeatureModal.propTypes = {
  trigger: PropTypes.shape({}).isRequired,
  setSaveProjectInitiated: PropTypes.func.isRequired,
  setSaveAsProjectInitiated: PropTypes.func.isRequired,
  setProjectsOpenInitiated: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ProjectActions,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(PrivateFeatureModal);
