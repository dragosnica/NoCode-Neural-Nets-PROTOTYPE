/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export default function ActivationForm(props) {
  return (
    <div className="editor_form_section">
      {/* Choose the input layer&#39;s configuration */}
      <form onSubmit={props.handleSubmit} className="editor_form">
        <br />
        <label htmlFor="activation" className="editor_form_label">
          Activation:
          <br />
          <select
            id="activation"
            className="editor_form_input"
            name="activation"
            type="string"
            value={props.activation}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="elu">elu</option>
            <option value="hardSigmoid">hardSigmoid</option>
            <option value="linear">linear</option>
            <option value="relu">relu</option>
            <option value="relu6">relu6</option>
            <option value="selu">selu</option>
            <option value="sigmoid">sigmoid</option>
            <option value="softmax">softmax</option>
            <option value="softplus">softplus</option>
            <option value="softsign">softsign</option>
            <option value="tanh">tanh</option>
          </select>
        </label>
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
        <label htmlFor="batchInputShape">
          Batch input shape:
          <br />
          <input
            name="batchInputShape"
            type="number"
            value={props.batchInputShape}
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
        </label>
        <br />
        <label htmlFor="name">
          Name:
          <br />
          <input
            name="name"
            type="string"
            value={props.name}
            onChange={props.handleFormOnChangeForStrings}
          />
        </label>
        <br />
        <label htmlFor="trainable">
          Trainable:
          <br />
          <input
            name="trainable"
            type="checkbox"
            checked={props.trainable}
            onChange={props.handleFormOnChangeForBools}
          />
        </label> */}
        <br />
        <input type="submit" className="editor_form_confirmation" value="Configure layer" />
      </form>
    </div>
  );
}

ActivationForm.propTypes = {
  activation: PropTypes.string.isRequired,
  // inputShape: PropTypes.number.isRequired,
  // batchInputShape: PropTypes.number.isRequired,
  // batchSize: PropTypes.number.isRequired,
  // name: PropTypes.string.isRequired,
  // trainable: PropTypes.bool.isRequired,
  // handleFormOnChangeForInts: PropTypes.func.isRequired,
  handleFormOnChangeForStrings: PropTypes.func.isRequired,
  // handleFormOnChangeForBools: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
