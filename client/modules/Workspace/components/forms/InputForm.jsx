/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export default function InputForm(props) {
  return (
    <div className="editor_form_section">
      {/* Choose the input layer&#39;s configuration */}
      <form onSubmit={props.handleSubmit} className="editor_form">
        {/* <br />
        <label htmlFor="shape">
          Input shape:
          <br />
          <input
            name="shape"
            type="number"
            value={props.shape}
            onChange={props.handleFormOnChangeForInts}
          />
        </label> */}
        <br />
        <label htmlFor="batchShape" className="editor_form_label">
          Batch shape:
          <br />
          <input
            className="editor_form_input"
            name="batchShape"
            type="string"
            value={props.batchShape}
            onChange={props.handleFormOnChangeForStrings}
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
        <br />
        <input type="submit" className="editor_form_confirmation" value="Configure layer" />
      </form>
    </div>
  );
}

InputForm.propTypes = {
  // shape: PropTypes.number.isRequired,
  batchShape: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  dtype: PropTypes.string.isRequired,
  sparse: PropTypes.bool.isRequired,
  // handleFormOnChangeForInts: PropTypes.func.isRequired,
  handleFormOnChangeForStrings: PropTypes.func.isRequired,
  handleFormOnChangeForBools: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
