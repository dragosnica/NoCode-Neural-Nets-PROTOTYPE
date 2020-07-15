import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectActions from '../../actions/project';

function SaveErrorModal(props) {
  const {
    projectReducers: {
      projectSaveInitiated,
      projectSaveAsInitiated,
      projectSavedSuccessfully
    },
    setSaveProjectInitiated
  } = props;
  return (
    <Popup
      position="bottom center"
      open={((projectSaveInitiated || projectSaveAsInitiated) && (projectSavedSuccessfully === false))}
      arrow={false}
      modal
      onClose={setSaveProjectInitiated.bind(this, false)}
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <div>
        <button
          type="button"
        >
          <p className="workspace_close_button">&times;</p>
        </button>
        <h3 className="editor_form_title">
          There was an error saving the project !
        </h3>
        <div className="nav_modal_message">
          <span>
            The reason might be that you don&apos;t have a network configuration started.
          </span>
        </div>
        <div className="nav_modal_message">
          <span>
            Click on &apos;New&apos; in the navigation menu and select a configuration type, then try again.
          </span>
        </div>
        <div className="workspace_popup_actions">
          <li className="nav_item">
            <button
              type="button"
              className="workspace_confirmation"
              onClick={setSaveProjectInitiated.bind(this, false)}
            >
              OK
            </button>
          </li>
        </div>
      </div>
    </Popup>
  );
}

SaveErrorModal.propTypes = {
  setSaveProjectInitiated: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    projectSavedSuccessfully: PropTypes.bool,
    projectSaveInitiated: PropTypes.bool,
    projectSaveAsInitiated: PropTypes.bool
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ProjectActions,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveErrorModal);
