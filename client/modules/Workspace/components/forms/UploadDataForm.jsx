/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import uuid from 'react-uuid';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as ProjectActions from '../../actions/project';
import uploadSVG from '../../../../images/cloud_upload.svg';
import checkSVG from '../../../../images/check_icon.svg';

class UploadDataForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {
        state: 'none'
      },
      uploadSuccessful: false,
      dropzoneHighlighted: false,
    };

    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.handleOnFilesAdded = this.handleOnFilesAdded.bind(this);
    this.handleOnDragOver = this.handleOnDragOver.bind(this);
    this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  openFileDialog() {
    const { disabled } = this.props;
    if (disabled) return;
    this.fileInputRef.current.click();
  }

  handleOnFilesAdded(event) {
    const { disabled } = this.props;
    if (disabled) return;
    const { files } = event.target;
    // console.log('files');
    // console.log(files);
    // console.log('files[0]');
    // console.log(files[0]);
    // const fileURL = URL.createObjectURL(files[0]);
    // console.log('fileURL');
    // console.log(fileURL);

    const filesArray = Array.from(files);

    // console.log('filesArray');
    // console.log(filesArray);
    // console.log(filesArray[0]);
    // const dataset = tfjs.data.csv(URL.createObjectURL(filesArray[0]));
    // console.log('tfjs.data.csv.url');
    // console.log(dataset);
    // dataset.columnNames()
    //   .then((response) => {
    //     console.log('columnNames');
    //     console.log(response);
    //   });

    this.setState({
      files: filesArray
    });
  }

  handleOnFilesAddedViaDrop(event) {
    const { disabled } = this.props;
    if (disabled) return;
    const { files } = event.dataTransfer;

    const filesArray = Array.from(files);
    this.setState({
      files: filesArray,
    });
  }

  handleOnDragOver(event) {
    event.preventDefault();
    const { disabled } = this.props;
    if (disabled) return;
    this.setState({
      dropzoneHighlighted: true
    });
  }

  handleOnDragLeave() {
    this.setState({
      dropzoneHighlighted: false
    });
  }

  handleOnDrop(event) {
    event.preventDefault();
    const { disabled } = this.props;
    if (disabled) return;

    this.handleOnFilesAddedViaDrop(event);

    this.setState({
      dropzoneHighlighted: false
    });
  }

  requestFilesUpload(data) {
    const {
      projectUploadError,
      setProjectFiles,
      saveProject,
      projectReducers: {
        id,
      },
    } = this.props;

    const API_ROOT_URL = process.env.API_URL;

    axios.post(`${API_ROOT_URL}/projects/${id}/files/upload`, data, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

        if (percentCompleted === 100) {
          this.setState({
            uploadProgress: {
              percentage: percentCompleted,
              state: 'done'
            }
          });
        }
        if (percentCompleted !== null && percentCompleted < 100) {
          this.setState({
            uploadProgress: {
              percentage: percentCompleted,
              state: 'pending'
            }
          });
        }
      }
    })
      .then((response) => {
        this.setState({
          uploadSuccessful: true,
          uploading: false,
        });
        setProjectFiles(response.data);
        saveProject(false);
      })
      .catch((error) => {
        this.setState({
          uploadProgress: {
            percentage: 0,
            state: 'error'
          }
        });
        projectUploadError(error);
      });
  }

  uploadFiles() {
    const {
      files
    } = this.state;

    this.setState({
      uploadProgress: {},
      uploading: true
    });

    const data = new FormData();
    files.forEach((file) => {
      data.append('file', file, file.name);
    });
    this.requestFilesUpload(data);
  }

  renderProgress(file) {
    const {
      uploadProgress,
      uploading,
      uploadSuccessful
    } = this.state;
    if (uploading || uploadSuccessful) {
      return (
        <div className="upload_data_form_progress_bar_container">
          <div className="upload_data_form_progress_bar_card">
            <div
              className="upload_data_form_progress_bar"
              style={{
                width: uploadProgress ? `${uploadProgress.percentage} %` : '0%'
              }}
            />
          </div>
          <img
            className="upload_data_form_progress_bar_check_icon"
            alt="done"
            src={checkSVG}
            style={{
              opacity: uploadProgress && uploadProgress.state === 'done' ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    const {
      uploading,
      uploadSuccessful,
      files
    } = this.state;

    if (uploadSuccessful) {
      return (
        <button
          type="button"
          className="upload_data_form_button"
          onClick={() => this.setState({
            files: [],
            uploadSuccessful: false,
            uploadProgress: {
              state: 'none'
            }
          })}
        >
          Clear
        </button>
      );
    }
    if (!uploadSuccessful) {
      return (
        <button
          type="button"
          className="upload_data_form_button"
          disabled={files.length === 0 || uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    const {
      formOpen,
      hideForm,
      disabled
    } = this.props;

    const {
      files,
      dropzoneHighlighted
    } = this.state;

    const dropzoneClass = classNames({
      upload_data_form_dropzone: !dropzoneHighlighted,
      upload_data_form_dropzone_highlighted: dropzoneHighlighted
    });

    return (
      <Modal
        isOpen={formOpen}
        shouldCloseOnEsc={false}
        shouldCloseOnOverlayClick={false}
        style={{
          content: {
            width: 500,
            height: 300,
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
          <div className="upload_data_form_container">
            <span className="upload_data_form_title">
              File upload:
            </span>
            <div className="upload_data_form_content">
              <div className="upload_data_form_dropzone_container">
                <div className="upload_data_form_dropzone_card">
                  <div
                    className={dropzoneClass}
                    onClick={this.openFileDialog}
                    onDragOver={this.handleOnDragOver}
                    // onDragLeave={this.handleOnDragLeave}
                    onDrop={this.handleOnDrop}
                    style={{
                      cursor: disabled ? 'default' : 'pointer',
                    }}
                  >
                    <img
                      alt="upload"
                      className="upload_data_form_dropzone_icon"
                      src={uploadSVG}
                    />
                    <span>File upload</span>
                    <input
                      ref={this.fileInputRef}
                      type="file"
                      className="upload_data_form_file_input"
                      onChange={this.handleOnFilesAdded}
                    />
                  </div>
                </div>
              </div>
              <div className="upload_data_form_files">
                {files.map((file) => (
                  <div key={uuid()} className="upload_data_form_file_row">
                    <span className="upload_data_form_file_name">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                ))}
              </div>
            </div>
            <div className="upload_data_form_actions">
              {this.renderActions()}
            </div>
            {/* <label htmlFor="uploadFile">
              File upload:
              <input type="file" accept=".csv" />
            </label> */}
          </div>
        </div>
      </Modal>
    );
  }
}

UploadDataForm.propTypes = {
  projectUploadError: PropTypes.func.isRequired,
  setProjectFiles: PropTypes.func.isRequired,
  saveProject: PropTypes.func.isRequired,
  projectReducers: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
  formOpen: PropTypes.bool.isRequired,
  hideForm: PropTypes.func.isRequired,
};

UploadDataForm.defaultProps = {
  disabled: undefined
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
    userReducers: state.userReducers,
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadDataForm);
