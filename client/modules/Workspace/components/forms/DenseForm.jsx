/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

export default function DenseLayerForm(props) {
  return (
    <div className="editor_form_section">
      {/* Choose the dense layer&#39;s configuration */}
      <form onSubmit={props.handleSubmit} className="editor_form">
        <br />
        <label htmlFor="units" className="editor_form_label">
          Number of units:
          <br />
          <input
            className="editor_form_input"
            name="units"
            type="number"
            value={props.units}
            onChange={props.handleFormOnChangeForInts}
          />
        </label>
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
        <br />
        <label htmlFor="useBias" className="editor_form_label">
          Use bias:
          {' '}
          <input
            className="editor_form_checkbox"
            name="useBias"
            type="checkbox"
            checked={props.useBias}
            onChange={props.handleFormOnChangeForBools}
          />
        </label>
        <br />
        <label htmlFor="kernelInitializer" className="editor_form_label">
          Kernel initializer:
          <br />
          <select
            id="kernelInitializer"
            className="editor_form_input"
            name="kernelInitializer"
            type="string"
            value={props.kernelInitializer}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="constant">constant</option>
            <option value="glorotNormal">glorotNormal</option>
            <option value="glorotUniform">glorotUniform</option>
            <option value="heNormal">heNormal</option>
            <option value="heUniform">heUniform</option>
            <option value="identity">identity</option>
            <option value="leCunNormal">leCunNormal</option>
            <option value="leCunUniform">leCunUniform</option>
            <option value="ones">ones</option>
            <option value="orthogonal">orthogonal</option>
            <option value="randomNormal">randomNormal</option>
            <option value="randomUniform">randomUniform</option>
            <option value="truncatedNormal">truncatedNormal</option>
            <option value="varianceScaling">varianceScaling</option>
            <option value="zeros">zeros</option>
          </select>
        </label>
        <br />
        <label htmlFor="biasInitializer" className="editor_form_label">
          Bias initializer:
          <br />
          <select
            id="biasInitializer"
            className="editor_form_input"
            name="biasInitializer"
            type="string"
            value={props.biasInitializer}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="constant">constant</option>
            <option value="glorotNormal">glorotNormal</option>
            <option value="glorotUniform">glorotUniform</option>
            <option value="heNormal">heNormal</option>
            <option value="heUniform">heUniform</option>
            <option value="identity">identity</option>
            <option value="leCunNormal">leCunNormal</option>
            <option value="leCunUniform">leCunUniform</option>
            <option value="ones">ones</option>
            <option value="orthogonal">orthogonal</option>
            <option value="randomNormal">randomNormal</option>
            <option value="randomUniform">randomUniform</option>
            <option value="truncatedNormal">truncatedNormal</option>
            <option value="varianceScaling">varianceScaling</option>
            <option value="zeros">zeros</option>
          </select>
        </label>
        {/* <br />
        <label htmlFor="inputDim">
          Input dim:
          <br />
          <input
            name="inputDim"
            type="number"
            value={props.inputDim}
            onChange={props.handleFormOnChangeForInts}
          />
        </label> */}
        <br />
        <label htmlFor="kernelConstraint" className="editor_form_label">
          Kernel constraint:
          <br />
          <select
            id="kernelConstraint"
            className="editor_form_input"
            name="kernelConstraint"
            type="string"
            value={props.kernelConstraint}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="null">none</option>
            <option value="maxNorm">maxNorm</option>
            <option value="minMaxNorm">minMaxNorm</option>
            <option value="nonNeg">nonNeg</option>
            <option value="unitNorm">unitNorm</option>
          </select>
        </label>
        <br />
        <label htmlFor="biasConstraint" className="editor_form_label">
          Bias constraint:
          <br />
          <select
            id="biasConstraint"
            className="editor_form_input"
            name="biasConstraint"
            type="string"
            value={props.biasConstraint}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="null">none</option>
            <option value="maxNorm">maxNorm</option>
            <option value="minMaxNorm">minMaxNorm</option>
            <option value="nonNeg">nonNeg</option>
            <option value="unitNorm">unitNorm</option>
          </select>
        </label>
        <br />
        <label htmlFor="kernelRegularizer" className="editor_form_label">
          Kernel regularizer:
          <br />
          <select
            id="kernelRegularizer"
            className="editor_form_input"
            name="kernelRegularizer"
            type="string"
            value={props.kernelRegularizer}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="null">none</option>
            <option value="l1">l1</option>
            <option value="l2">l2</option>
            <option value="l1l2">l1l2</option>
          </select>
        </label>
        <br />
        <label htmlFor="biasRegularizer" className="editor_form_label">
          Bias regularizer:
          <br />
          <select
            id="biasRegularizer"
            className="editor_form_input"
            name="biasRegularizer"
            type="string"
            value={props.biasRegularizer}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="null">none</option>
            <option value="l1">l1</option>
            <option value="l2">l2</option>
            <option value="l1l2">l1l2</option>
          </select>
        </label>
        <br />
        <label htmlFor="activityRegularizer" className="editor_form_label">
          Activity regularizer:
          <br />
          <select
            id="activityRegularizer"
            className="editor_form_input"
            name="activityRegularizer"
            type="string"
            value={props.activityRegularizer}
            onChange={props.handleFormOnChangeForStrings}
          >
            <option value="null">none</option>
            <option value="l1">l1</option>
            <option value="l2">l2</option>
            <option value="l1l2">l1l2</option>
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
        </label> */}
        <br />
        <label htmlFor="trainable" className="editor_form_label">
          Trainable:
          {' '}
          <input
            className="editor_form_checkbox"
            name="trainable"
            type="checkbox"
            checked={props.trainable}
            onChange={props.handleFormOnChangeForBools}
          />
        </label>
        <br />
        <input type="submit" className="editor_form_confirmation" value="Configure layer" />
      </form>
    </div>
  );
}

DenseLayerForm.propTypes = {
  units: PropTypes.number.isRequired,
  activation: PropTypes.string.isRequired,
  useBias: PropTypes.bool.isRequired,
  kernelInitializer: PropTypes.string.isRequired,
  biasInitializer: PropTypes.string.isRequired,
  // inputDim: PropTypes.number.isRequired,
  kernelConstraint: PropTypes.string.isRequired,
  biasConstraint: PropTypes.string.isRequired,
  kernelRegularizer: PropTypes.string.isRequired,
  biasRegularizer: PropTypes.string.isRequired,
  activityRegularizer: PropTypes.string.isRequired,
  // inputShape: PropTypes.number.isRequired,
  // batchInputShape: PropTypes.number.isRequired,
  // batchSize: PropTypes.number.isRequired,
  // name: PropTypes.string.isRequired,
  trainable: PropTypes.bool.isRequired,
  // TODO: weights requires a tf.Tensor object. Implement this
  // weights

  // TODO: inputDType ("Legacy support. Do not use for new code??")
  // inputDType: PropTypes.string.isRequired,
  handleFormOnChangeForInts: PropTypes.func.isRequired,
  handleFormOnChangeForStrings: PropTypes.func.isRequired,
  handleFormOnChangeForBools: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
