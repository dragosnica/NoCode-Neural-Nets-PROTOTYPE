import mongoose from 'mongoose';
import './user';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  networkType: {
    type: String,
    required: true
  },
  layers: {
    type: Array,
    required: true,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastSaved: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  lastCompiled: Date,
  networkOpMode: String,
  optimizer: String,
  useLearningRate: Boolean,
  learningRate: Number,
  momentum: Number,
  useNesterov: Boolean,
  initialAccumulatorValue: Number,
  rho: Number,
  epsilon: Number,
  beta1: Number,
  beta2: Number,
  decay: Number,
  centered: Boolean,
  loss: String,
  metrics: String,
  files: Array,
  openDataset: String,
});

const ProjectModel = mongoose.model('Project', ProjectSchema);
export default ProjectModel;
