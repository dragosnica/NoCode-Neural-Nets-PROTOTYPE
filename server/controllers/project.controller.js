/* eslint-disable consistent-return */
import isAfter from 'date-fns/isAfter';
import fs from 'fs';
import mongoose from 'mongoose';
import { IncomingForm } from 'formidable';
import * as tfjs from '@tensorflow/tfjs';
import ProjectModel from '../db_models/project';
import UserModel from '../db_models/user';
import FileModel from '../db_models/file';

export function saveNewProject(req, res) {
  const { projectReducers } = req.body;
  ProjectModel.findOne({ ownerID: req.user._id, name: projectReducers.name }, (projectFindError, project) => {
    if (projectFindError) {
      return res.status(500).send({ message: { projectFindError } });
    }
    if (project) {
      return res.status(401).send({ message: { projectNameError: 'A project with this name already exists !' } });
    }
    const newProject = new ProjectModel({
      ownerID: req.user._id,
      name: projectReducers.name,
      networkType: projectReducers.networkSchema.networkType,
      layers: projectReducers.networkSchema.layers,
      lastSaved: Date.now(),
      createdAt: Date.now(),
      lastCompiled: projectReducers.lastCompiled,
      networkOpMode: projectReducers.networkOpMode,
      optimizer: projectReducers.optimizer,
      useLearningRate: projectReducers.useLearningRate,
      learningRate: projectReducers.learningRate,
      momentum: projectReducers.momentum,
      useNesterov: projectReducers.useNesterov,
      initialAccumulatorValue: projectReducers.initialAccumulatorValue,
      rho: projectReducers.rho,
      epsilon: projectReducers.epsilon,
      beta1: projectReducers.beta1,
      beta2: projectReducers.beta2,
      decay: projectReducers.decay,
      centered: projectReducers.centered,
      loss: projectReducers.loss,
      metrics: projectReducers.metrics,
      files: projectReducers.files,
    });
    newProject.save((projectSaveError, savedProject) => {
      if (projectSaveError) {
        res.status(500).send({ message: { projectSaveError } });
      }
      res.send(savedProject);
    });
  });
}

export function saveProject(req, res) {
  const { projectReducers } = req.body;
  ProjectModel.findOne({ ownerID: req.user._id, name: projectReducers.name }, (projectFindError, project) => {
    if (projectFindError) {
      return res.status(500).send({ message: { projectFindError } });
    }
    if (project && !project._id.equals(projectReducers.id)) {
      return res.status(401).send({ message: { projectNameError: 'A project with this name already exists !' } });
    }
    ProjectModel.findById(projectReducers.id, (projectFindByIdError, oldProject) => {
      if (projectFindByIdError) {
        return res.status(500).send({ message: { projectFindByIdError } });
      }
      if (!oldProject.ownerID.equals(req.user._id)) {
        return res.status(403).send({ message: 'The logged user does not own this project !' });
      }
      if (projectReducers.lastSaved
        && isAfter(new Date(oldProject.lastSaved), new Date(projectReducers.lastSaved))) {
        return res.status(409).send({ message: 'Attempted to save stale version of the project !' });
      }
      ProjectModel.findByIdAndUpdate(
        projectReducers.id,
        {
          $set: {
            name: projectReducers.name,
            networkType: projectReducers.networkSchema.networkType,
            layers: projectReducers.networkSchema.layers,
            lastSaved: Date.now(),
            lastCompiled: projectReducers.lastCompiled,
            networkOpMode: projectReducers.networkOpMode,
            optimizer: projectReducers.optimizer,
            useLearningRate: projectReducers.useLearningRate,
            learningRate: projectReducers.learningRate,
            momentum: projectReducers.momentum,
            useNesterov: projectReducers.useNesterov,
            initialAccumulatorValue: projectReducers.initialAccumulatorValue,
            rho: projectReducers.rho,
            epsilon: projectReducers.epsilon,
            beta1: projectReducers.beta1,
            beta2: projectReducers.beta2,
            decay: projectReducers.decay,
            centered: projectReducers.centered,
            loss: projectReducers.loss,
            metrics: projectReducers.metrics,
            files: projectReducers.files,
          }
        },
        {
          new: true
        }
      )
        .exec((projectUpdateError, newProjectEntry) => {
          if (projectUpdateError) {
            return res.status(500).send({ message: { projectUpdateError } });
          }
          newProjectEntry.save((projectSaveError, savedProject) => {
            if (projectSaveError) {
              return res.status(500).send({ message: { projectSaveError } });
            }
            return res.send(savedProject);
          });
          // return res.send(newProjectEntry);
        });
    });
  });
}

export function deleteProject(req, res) {
  UserModel.findById(req.user._id, (userFindError, user) => {
    if (userFindError) {
      return res.status(500).send({ message: { userFindError } });
    }
    if (!user) {
      return res.status(401).send({ message: 'Non-existent user!' });
    }
    ProjectModel.findById(req.params.project_id, (projectFindError, project) => {
      if (projectFindError) {
        return res.status(500).send({ message: { projectFindError } });
      }
      if (!project) {
        return res.status(401).send({ message: 'Non-existent project !' });
      }
      if (!project.ownerID.equals(user._id)) {
        return res.status(500).send({ message: 'An authentication errror occured !' });
      }
      // TODO: delete project files
      ProjectModel.deleteOne({ _id: project._id }, (projectDeleteError, acknowledgment) => {
        if (projectDeleteError) {
          return res.status(500).send({ message: { projectDeleteError } });
        }
        if (!acknowledgment) {
          return res.status(401).send({ message: { projectDeleteError: 'The project was not deleted successfully' } });
        }
        return res.send(project);
      });
    });
  });
}

export function getProjectsForUser(req, res) {
  UserModel.findById(req.user._id, (userFindError, user) => {
    if (userFindError) {
      return res.status(500).send({ message: { userFindError } });
    }
    if (!user) {
      return res.status(401).send({ message: 'Non-existent user!' });
    }
    if (user.username !== req.params.username) {
      return res.status(500).send({ message: 'An authentication errror occured !' });
    }
    ProjectModel.find({ ownerID: user._id })
      .sort('-lastSaved')
      .select('name networkType createdAt lastSaved')
      .exec((projectFindError, projects) => {
        if (projectFindError) {
          return res.status(500).send({ message: { projectFindError } });
        }
        res.send(projects);
      });
  });
}

export function findByIdAndOpenProject(req, res) {
  ProjectModel.findById(req.params.project_id, (projectFindError, project) => {
    if (projectFindError) {
      return res.status(500).send({ message: { projectFindError } });
    }
    if (!project) {
      return res.status(401).send({ message: 'Project with that ID does not exist !' });
    }
    return res.send(project);
  });
}

export function findByNameAndOpenProject(req, res) {
  UserModel.findOne({ username: req.params.username }, (userFindError, user) => {
    if (userFindError) {
      return res.status(500).send({ message: { userFindError } });
    }
    if (!user) {
      return res.status(401).send({ message: 'Non-existent user!' });
    }
    if (!user._id.equals(req.user._id)) {
      return res.status(409).send({ message: `User with username ${req.params.username} is not logged in !, ${req.user._id}` });
    }
    ProjectModel.findOne({ ownerID: user._id, name: req.params.project_name }, (projectFindError, project) => {
      if (projectFindError) {
        return res.status(500).send({ message: { projectFindError } });
      }
      if (!project) {
        return res.status(401).send({ message: 'Project does not exist !' });
      }
      return res.send(project);
    });
  });
}

export function uploadFiles(req, res) {
  const form = new IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (parsingError, fields, files) => {
    if (parsingError) {
      return res.status(500).send({ message: { parsingError } });
    }
    if (FileModel.length === 0) {
      return res.status(500).send({ message: { GridFSError: 'GridFS was not setup properly' } });
    }
    const newFileName = `${Date.now()}-${files.file.name}`;
    const writeStream = FileModel[0].openUploadStream(newFileName);
    fs.createReadStream(files.file.path).pipe(writeStream);
    const fileObject = {};
    fileObject[newFileName] = writeStream.id;
    return res.send(fileObject);
  });
}

export function getProjectFile(req, res) {
  UserModel.findOne({ username: req.params.username }, (userFindError, user) => {
    if (userFindError) {
      return res.status(500).send({ message: { userFindError } });
    }
    if (!user) {
      return res.status(401).send({ message: 'Non-existent user!' });
    }
    if (!user._id.equals(req.user._id)) {
      return res.status(409).send({ message: `User with username ${req.params.username} is not logged in !, ${req.user._id}` });
    }
    ProjectModel.findOne({ ownerID: user._id, name: req.params.project_name }, (projectFindError, project) => {
      if (projectFindError) {
        return res.status(500).send({ message: { projectFindError } });
      }
      if (!project) {
        return res.status(401).send({ message: { projectFindError: 'Project does not exist !' } });
      }
      project.files.forEach((file) => {
        if (Object.keys(file)[0] === req.params.file_name) {
          FileModel[0].find(
            { _id: mongoose.Types.ObjectId(file[Object.keys(file)[0]]) }
          ).toArray((cursorToArrayError, files) => {
            if (cursorToArrayError) {
              return res.status(500).send({ message: { cursorToArrayError } });
            }
            const filesArray = files;
            if (filesArray.length === 0) {
              return res.status(401).send({ message: { fileFindError: 'File does not exist!' } });
            }
            const readStream = FileModel[0].openDownloadStream(filesArray[0]._id);
            readStream.pipe(res);
            readStream.on('error', (fileReadError) => res.status(500).send({ message: { fileReadError } }));
            readStream.on('end', () => res.end());
          });
        }
      });
      //   .then((files) => {
      //     if (!files[0]) {
      //       return res.status(401).send({ message: 'File does not exist!' });
      //     }
      //     return res.send(files[0]);
      //   })
      //   .catch((fileFindError) => res.status(500).send({ message: { fileFindError } }));

      // let readStream;
      // // const FileModel = createModel();
      // project.files.forEach((file) => {
      //   // FileModel.findById(file[Object.keys(file)[0]], ((fileFindError, attachment) => {
      //   //   if (fileFindError) {
      //   //     return res.status(500).send({ message: { fileFindError } });
      //   //   }
      //   //   readStream = attachment.read();
      //   // }));
      //   readStream = FileModel.read({ _id: file[Object.keys(file)[0]] });
      //   console.log('readStream');
      //   console.log(readStream);
      //   FileModel.unlink({ _id: file[Object.keys(file)[0]] }, ((error) => {
      //     if (error) {
      //       console.log('error');
      //       console.log(error);
      //     }
      //   }));
      //   console.log('readStream.files');
      //   console.log(readStream.files);
      // });
      // return res.send(readStream);


      // const USER_DATA_PATH = `USER_DATA/user-${user._id}/project-${project._id}/`;
      // fs.readdir(path.join(process.cwd(), USER_DATA_PATH), (readDirError, files) => {
      //   if (readDirError) {
      //     return res.status(500).send({ message: { readDirError } });
      //   }
      //   if (!files) {
      //     return res.status(401).send({
      //       message: {
      //         readDirError: 'There are no files associated with this project !'
      //       }
      //     });
      //   }

      //   files.forEach((file) => {
      //   });
      //   return res.send();
      // });
    });
  });
}
