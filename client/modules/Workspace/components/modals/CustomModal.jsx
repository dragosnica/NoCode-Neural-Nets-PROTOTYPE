/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import uuid from 'react-uuid';

export default function CustomModal(props) {
  const {
    hideModal,
    modalState,
    approveAction,
    message,
  } = props;
  const newMessage = message.split('\n');
  return (
    <Popup
      position="bottom center"
      open={modalState}
      arrow={false}
      modal
      contentStyle={{
        width: 380,
      }}
      onClose={hideModal}
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      <p onClick={hideModal} className="workspace_close_button">&times;</p>
      {newMessage.map((subMessage, idx) => (
        <p className="userForm_label_header" key={uuid()}>{subMessage}</p>
      ))}
      {/* <span className="userForm_label_header">{message}</span> */}
      <div className="workspace_popup_actions">
        {approveAction !== undefined ? (
          <p
            className="workspace_confirmation_small"
            onClick={approveAction}
          >
            OK
          </p>
        ) : (
          <p
            className="workspace_confirmation_small"
            onClick={hideModal}
          >
            OK
          </p>
        )}
      </div>
    </Popup>
  );
}

CustomModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  approveAction: PropTypes.func,
  message: PropTypes.string.isRequired,
};

CustomModal.defaultProps = {
  approveAction: undefined
};
