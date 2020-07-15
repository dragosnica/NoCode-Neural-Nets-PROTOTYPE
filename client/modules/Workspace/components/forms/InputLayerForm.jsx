/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export default function InputLayerForm(props) {
  return (
    <div className="editor_form_section">
      {/* Choose the input layer&#39;s configuration */}
      <form onSubmit={props.handleSubmit} className="editor_form">
        {/* <br />
          <label htmlFor="inputShape">
            Input shape:
            <br />
            <input
              name="inputShape"
              type="number"
              value={props.inputShape}
              onChange={props.handleFormOnChangeForInts}
            />
          </label>
          <br />
          <label htmlFor="batchSize">
            Batch size:
            <br />
            <input
              name="batchSize"
              type="number"
              value={props.batchSize}
              onChange={props.handleFormOnChangeForInts}
            />
          </label> */}
        <br />
        <label htmlFor="batchInputShape" className="editor_form_label">
          Batch input shape:
          <br />
          <input
            className="editor_form_input"
            name="batchInputShape"
            type="string"
            value={props.batchInputShape}
            onChange={props.handleFormOnChangeForStrings}
          />
        </label>
        <br />
        <label htmlFor="dtype" className="editor_form_label">
          Data type:
          <br />
          <select
            id="dtype"
            className="editor_form_input"
            name="dtype"
            type="string"
            value={props.dtype}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="float32">float32</option>
            <option value="int32">int32</option>
            <option value="bool">bool</option>
            <option value="complex64">complex64</option>
          </select>
        </label>
        <br />
        <label htmlFor="sparse" className="editor_form_label">
          Sparse:
          {' '}
          <input
            className="editor_form_checkbox"
            name="sparse"
            type="checkbox"
            checked={props.sparse}
            onChange={props.handleFormOnChangeForBools}
          />
        </label>
        {/* <br />
          <label htmlFor="name">
            Name:
            <br />
            <input
              name="name"
              type="string"
              value={props.name}
              onChange={props.handleFormOnChangeForStrings}
            />
          </label> */}
        <br />
        <input type="submit" className="editor_form_confirmation" value="Configure layer" />
      </form>
    </div>
  );
}

InputLayerForm.propTypes = {
  // inputShape: PropTypes.number.isRequired,
  // batchSize: PropTypes.number.isRequired,
  batchInputShape: PropTypes.string.isRequired,
  dtype: PropTypes.string.isRequired,
  sparse: PropTypes.bool.isRequired,
  // name: PropTypes.string.isRequired,
  // handleFormOnChangeForInts: PropTypes.func.isRequired,
  handleFormOnChangeForStrings: PropTypes.func.isRequired,
  handleFormOnChangeForBools: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
