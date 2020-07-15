/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React from 'react';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from '../Toast';
import * as ProjectActions from '../../actions/project';
import * as ToastActions from '../../actions/toast';
import { renderSmallField, onSubmitNewProjectNameFail, validateNewProjectName } from '../../../User/formUtils';

function ProjectSaveAsForm(props) {
  const {
    hideForm,
    formState,
    saveAsProject,
    projectReducers: {
      name,
      projectSaveAsInitiated,
      projectSavedSuccessfully,
    },
    userReducers: {
      user
    },
    toastReducers: {
      displayToast,
    },
    handleSubmit,
    pristine,
    submitting,
    invalid,
  } = props;


  if (projectSavedSuccessfully === true && !projectSaveAsInitiated) {
    return (
      <div>
        {displayToast && <Toast />}
        <Redirect to={`/${user.username}/projects/${name}`} />
      </div>
    );
  }

  return (
    <Modal
      isOpen={formState}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          width: 320,
          height: 90,
        }
      }}
      ariaHideApp={false}
    >
      <div>
        <button
          type="button"
          onClick={hideForm}
          className="upload_data_form_close"
        >
          &times;
        </button>
        <div>
          <form className="nav_modal_form" onSubmit={handleSubmit(saveAsProject.bind(this))}>
            <Field name="projectName" type="string" label="Project name" component={renderSmallField} />
            <div>
              <input
                type="submit"
                disabled={pristine || submitting || invalid}
                value="Save project"
              />
            </div>
          </form>
        </div>
      </div>
    </Modal>
    // <Popup
    //   trigger={(
    //     <span className="nav_dropdown_subitem">
    //       Save As
    //     </span>
    //   )}
    //   position="bottom left"
    //   modal={false}
    //   contentStyle={{
    //     width: 300,
    //   }}
    // >
    //   {(close) => (
    //     <div>
    //       <p onClick={close} className="workspace_close_button">&times;</p>
    //       <div>
    //         <form className="nav_modal_form" onSubmit={handleSubmit(saveAsProject.bind(this))}>
    //           <Field name="projectName" type="string" label="Project name" component={renderSmallField} />
    //           <div>
    //             <input
    //               type="submit"
    //               disabled={pristine || submitting || invalid}
    //               value="Save project"
    //             />
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </Popup>
  );
}

ProjectSaveAsForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
  formState: PropTypes.bool.isRequired,
  saveAsProject: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    name: PropTypes.string,
    projectSaveAsInitiated: PropTypes.bool,
    projectSavedSuccessfully: PropTypes.bool,
  }).isRequired,
  userReducers: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  toastReducers: PropTypes.shape({
    displayToast: PropTypes.bool,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
};

ProjectSaveAsForm.defaultProps = {
  pristine: true,
  submitting: false,
  invalid: false,
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
    userReducers: state.userReducers,
    toastReducers: state.toastReducers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ProjectActions,
      ...ToastActions,
    },
    dispatch
  );
}

export default reduxForm({
  form: 'projectSaveAs',
  fields: ['projectName'],
  onSubmitNewProjectNameFail,
  validate: validateNewProjectName,
})(connect(mapStateToProps, mapDispatchToProps)(ProjectSaveAsForm));
