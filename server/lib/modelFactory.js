import * as tfjs from '@tensorflow/tfjs';
import * as itemTypes from '../../client/constants/itemTypes';

export function createNetwork(req) {
  const layers = [...req.layers];
  let newNetwork;
  let newLayer;

  if (req.networkType === 'sequential') {
    newNetwork = tfjs[req.networkType]({ name: req.name });
    const serializableParamsAlways = ['batchInputShape', 'batchShape'];
    const serializableParamsIfNull = ['kernelConstraint', 'biasConstraint',
      'kernelRegularizer', 'biasRegularizer', 'activityRegularizer'];

    layers.forEach((layer) => {
      const layerWOId = layer[Object.keys(layer)];
      Object.keys(layerWOId.options).forEach((optionName) => {
        if (serializableParamsAlways.includes(optionName)) {
          layerWOId.options[optionName] = JSON.parse(layerWOId.options[optionName]);
        }
        if (serializableParamsIfNull.includes(optionName)
        && layerWOId.options[optionName] === 'null') {
          layerWOId.options[optionName] = JSON.parse(layerWOId.options[optionName]);
        }
      });
      newLayer = tfjs.layers[layerWOId.type](layerWOId.options);
      newNetwork.add(newLayer);
    });
  } else if (req.networkType === 'model') {
    const inputLayers = [];
    const outputLayers = [];
    const hiddenLayers = [];
    let layerName;
    let preecedingLayers = [];

    layers.forEach((layer) => {
      layerName = layer.options.name;

      if (layerName.includes('input')) {
        newLayer = tfjs[layer.type](layer.options);
        inputLayers.push(newLayer);
      } else {
        preecedingLayers = [];
        layer.preecedingLayers.forEach((l) => {
          inputLayers.forEach((il) => {
            if (l === il.sourceLayer.name) {
              preecedingLayers.push(il);
            }
          });
          hiddenLayers.forEach((hl) => {
            if (l === hl.sourceLayer.name) {
              preecedingLayers.push(hl);
            }
          });
        });
        console.log('Prev layers here:');
        console.log(layer.prevLayers);
        console.log(layer.options.name);
        console.log(preecedingLayers);
        newLayer = tfjs.layers[layer.type](layer.options).apply(preecedingLayers);
        console.log(newLayer);

        if (!layerName.includes('output')) {
          hiddenLayers.push(newLayer);
        } else if (layerName.includes('output')) {
          outputLayers.push(newLayer);
        }
      }
    });

    newNetwork = tfjs[req.networkType]({ inputs: inputLayers, outputs: outputLayers });
  }

  return newNetwork;
}

export function compileNetwork(req, network) {
  const { compileArgs, optimizerArgs } = req;
  const { optimizer } = compileArgs;
  let { loss } = compileArgs;

  let optimizerFunc = 0;
  if (optimizer === itemTypes.sgd) {
    optimizerFunc = tfjs.train[optimizer](optimizerArgs.learningRate);
  }

  if (optimizer === itemTypes.momentum) {
    optimizerFunc = tfjs.train[optimizer](
      optimizerArgs.learningRate,
      optimizerArgs.momentum,
      optimizerArgs.useNesterov
    );
  }

  if (optimizer === itemTypes.adagrad) {
    optimizerFunc = tfjs.train[optimizer](
      optimizerArgs.learningRate,
      optimizerArgs.initialAccumulatorValue,
    );
  }

  if (optimizer === itemTypes.adadelta) {
    if (optimizerArgs.epsilon === 0) {
      optimizerArgs.epsilon = null;
    }
    optimizerFunc = tfjs.train[optimizer](
      optimizerArgs.learningRate,
      optimizerArgs.rho,
      optimizerArgs.epsilon
    );
  }

  if (optimizer === itemTypes.adam) {
    if (optimizerArgs.epsilon === 0) {
      optimizerArgs.epsilon = null;
    }
    optimizerFunc = tfjs.train[optimizer](
      optimizerArgs.learningRate,
      optimizerArgs.beta1,
      optimizerArgs.beta2,
      optimizerArgs.epsilon
    );
  }

  if (optimizer === itemTypes.adamax) {
    if (optimizerArgs.epsilon === 0) {
      optimizerArgs.epsilon = null;
    }
    optimizerFunc = tfjs.train[optimizer](
      optimizerArgs.learningRate,
      optimizerArgs.beta1,
      optimizerArgs.beta2,
      optimizerArgs.epsilon,
      optimizerArgs.decay,
    );
  }

  if (optimizer === itemTypes.rmsprop) {
    if (optimizerArgs.epsilon === 0) {
      optimizerArgs.epsilon = null;
    }
    optimizerFunc = tfjs.train[optimizer](
      optimizerArgs.learningRate,
      optimizerArgs.decay,
      optimizerArgs.momentum,
      optimizerArgs.epsilon,
      optimizerArgs.centered,
    );
  }

  const lossesPassedByFunction = [
    itemTypes.absoluteDifference, itemTypes.cosineDistance, itemTypes.hingeLoss, itemTypes.huberLoss,
    itemTypes.logLoss, itemTypes.meanSquaredError, itemTypes.sigmoidCrossEntropy, itemTypes.softmaxCrossEntropy
  ];
  if (lossesPassedByFunction.includes(loss)) {
    loss = tfjs.losses[loss];
  }

  const metricsAsLossesPassedByFunction = [
    itemTypes.binaryAccuracy, itemTypes.categoricalAccuracy, itemTypes.precision, itemTypes.recall,
    itemTypes.sparseCategoricalAccuracy
  ];
  if (metricsAsLossesPassedByFunction.includes(loss)) {
    loss = tfjs.metrics[loss];
  }

  network.compile({
    optimizer: optimizerFunc,
    loss,
  });

  return network;
}
