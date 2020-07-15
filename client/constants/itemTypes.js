/* Layers */
// Input
export const input = 'input';
export const inputLayer = 'inputLayer';

// Basic
export const activation = 'activation';
export const dense = 'dense';
export const dropout = 'dropout';
export const embedding = 'embedding';
export const flatten = 'flatten';
export const permute = 'permute';
export const repeatVector = 'repeatVector';
export const reshape = 'reshape';
export const spatialDropout1d = 'spatialDropout1d';

// Conv
export const conv1d = 'conv1d';
export const conv2d = 'conv2d';
export const conv2dTranspose = 'conv2dTranspose';
export const conv3d = 'conv3d';
export const cropping2D = 'cropping2D';
export const depthwiseConv2d = 'depthwiseConv2d';
export const separableConv2d = 'separableConv2d';
export const upSampling2d = 'upSampling2d';
// Conv - Pooling
export const averagePooling1d = 'averagePooling1d';
export const averagePooling2d = 'averagePooling2d';
export const averagePooling3d = 'averagePooling3d';
export const globalAveragePooling1d = 'globalAveragePooling1d';
export const globalAveragePooling2d = 'globalAveragePooling2d';
export const globalMaxPooling1d = 'globalMaxPooling1d';
export const globalMaxPooling2d = 'globalMaxPooling2d';
export const maxPooling1d = 'maxPooling1d';
export const maxPooling2d = 'maxPooling2d';
export const maxPooling3d = 'maxPooling3d';
// Conv - Padding
export const zeroPadding2d = 'zeroPadding2d';

// Normalization
export const batchNormalization = 'batchNormalization';
export const layerNormalization = 'layerNormalization';

// Recurrent
export const gru = 'gru';
export const gruCell = 'gruCell';
export const lstm = 'lstm';
export const lstmCell = 'lstmCell';
export const rnn = 'rnn';
export const simpleRNN = 'simpleRNN';
export const simpleRNNCell = 'simpleRNNCell';
export const stackedRNNCells = 'stackedRNNCells';
// Recurrent - Wrappers
export const bidirectional = 'bidirectional';
export const timeDistributed = 'timeDistributed';

/* Training */
// Optimizers
export const sgd = 'sgd';
export const momentum = 'momentum';
export const adagrad = 'adagrad';
export const adadelta = 'adadelta';
export const adam = 'adam';
export const adamax = 'adamax';
export const rmsprop = 'rmsprop';

// Losses
export const absoluteDifference = 'absoluteDifference';
export const cosineDistance = 'cosineDistance';
export const hingeLoss = 'hingeLoss';
export const huberLoss = 'huberLoss';
export const logLoss = 'logLoss';
export const meanSquaredError = 'meanSquaredError';
export const sigmoidCrossEntropy = 'sigmoidCrossEntropy';
export const softmaxCrossEntropy = 'softmaxCrossEntropy';

// Metrics
export const binaryCrossentropy = 'binaryCrossentropy';
export const binaryAccuracy = 'binaryAccuracy';
export const categoricalCrossentropy = 'categoricalCrossentropy';
export const categoricalAccuracy = 'categoricalAccuracy';
export const cosineProximity = 'cosineProximity';
export const meanAbsoluteError = 'meanAbsoluteError';
export const meanAbsolutePercentageError = 'meanAbsolutePercentageError';
export const precision = 'precision';
export const recall = 'recall';
export const sparseCategoricalAccuracy = 'sparseCategoricalAccuracy';
