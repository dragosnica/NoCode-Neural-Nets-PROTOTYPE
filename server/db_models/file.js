import mongoose from 'mongoose';

const FileModel = [];
mongoose.connection.on('connected', () => {
  FileModel.push(new mongoose.mongo.GridFSBucket(mongoose.connection.db));
});

export default FileModel;
