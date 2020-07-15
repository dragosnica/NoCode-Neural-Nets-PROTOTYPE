/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import DraggableTool from './DraggableTool';
import * as ProjectActions from '../actions/project';
import * as WorkspaceActions from '../actions/workspace';
import * as ItemTypes from '../../../constants/itemTypes';
import forbiddenSVG from '../../../images/forbidden.svg';


// eslint-disable-next-line react/prefer-stateless-function
class ToolsFrame extends Component {
  render() {
    const toolsFrame = classNames({
      'tools_frame': true,
      'tools_frame-disabled': !this.props.workspaceReducers.toolsFrameEnable
    });
    return (
      <div className={toolsFrame}>
        <h1> Tools available </h1>
        <div className="tools_frame_menu">
          <div className="tools_frame_menu_submenu">
            <h2> Layers </h2>
            <div>
              <h3>Input</h3>
              {this.props.projectReducers.networkSchema.networkType === ''
            && (
              <div className="tools_frame_forbidden">
                <p className="tools_frame_forbidden_text">
                  Create a new model to enable the tools
                </p>
                <ReactSVG
                  src={forbiddenSVG}
                  className="tools_frame_forbidden_svg"
                />
              </div>
            )}
              {this.props.projectReducers.networkSchema.networkType === 'sequential'
            && (
              <div>
                <DraggableTool showCopyIcon itemType={ItemTypes.inputLayer} />
                {this.props.projectReducers.networkSchema.layers.length === 0 && (
                  <div className="tools_frame_text">
                    <p>
                      More layers will
                    </p>
                    <p>
                      be available
                    </p>
                    <p>
                      once an input
                    </p>
                    <p>
                      layer is initialised
                    </p>
                  </div>
                )}
              </div>
            )}
              {this.props.projectReducers.networkSchema.networkType === 'model'
            && (
              <div>
                <DraggableTool showCopyIcon itemType={ItemTypes.input} />
                {this.props.projectReducers.networkSchema.layers.length === 0 && (
                  <div className="tools_frame_text">
                    <p>
                      More layers will
                    </p>
                    <p>
                      be available
                    </p>
                    <p>
                      once an input
                    </p>
                    <p>
                      layer is initialised
                    </p>
                  </div>
                )}
              </div>
            )}
            </div>
            {/* Commented out draggables below are not ready for production */}
            {Object.entries(this.props.projectReducers.networkSchema.layers).length !== 0 && (
              <div>
                <div>
                  <h3>Basic</h3>
                  {/* <DraggableTool showCopyIcon itemType={ItemTypes.activation} /> */}
                  <DraggableTool showCopyIcon itemType={ItemTypes.dense} />
                  {/* <DraggableTool showCopyIcon itemType={ItemTypes.dropout} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.embedding} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.flatten} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.permute} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.repeatVector} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.reshape} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.spatialDropout1d} /> */}
                </div>
                {/* <div>
                  <h3>Convolutional</h3>
                  <DraggableTool showCopyIcon itemType={ItemTypes.conv1d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.conv2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.conv2dTranspose} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.conv3d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.cropping2D} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.depthwiseConv2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.separableConv2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.upSampling2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.averagePooling1d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.averagePooling2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.averagePooling3d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.globalAveragePooling1d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.globalAveragePooling2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.globalMaxPooling1d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.globalMaxPooling2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.maxPooling1d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.maxPooling2d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.maxPooling3d} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.zeroPadding2d} />
                </div>
                <div>
                  <h3>Recurrent</h3>
                  <DraggableTool showCopyIcon itemType={ItemTypes.gru} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.gruCell} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.lstm} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.lstmCell} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.rnn} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.simpleRNN} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.simpleRNNCell} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.stackedRNNCells} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.bidirectional} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.timeDistributed} />
                </div>
                <div>
                  <h3>Normalization</h3>
                  <DraggableTool showCopyIcon itemType={ItemTypes.batchNormalization} />
                  <DraggableTool showCopyIcon itemType={ItemTypes.layerNormalization} />
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ToolsFrame.propTypes = {
  projectReducers: PropTypes.shape({
    networkSchema: PropTypes.shape({
      networkType: PropTypes.string,
      layers: PropTypes.array
    }).isRequired,
  }).isRequired,
  workspaceReducers: PropTypes.shape({
    toolsFrameEnable: PropTypes.bool
  }).isRequired
};

function mapStateToProps(state) {
  return {
    projectReducers: state.projectReducers,
    workspaceReducers: state.workspaceReducers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...ProjectActions,
      ...WorkspaceActions
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsFrame);
