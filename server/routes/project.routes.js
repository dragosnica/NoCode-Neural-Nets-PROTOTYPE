import { Router } from 'express';
import * as ProjectController from '../controllers/project.controller';

const router = Router();
router.post('/projects/save', ProjectController.saveNewProject);
router.put('/projects/save/:project_id', ProjectController.saveProject);
router.delete('/projects/:project_id/delete', ProjectController.deleteProject);
router.get('/:username/projects', ProjectController.getProjectsForUser);
router.get('/projects/:project_id', ProjectController.findByIdAndOpenProject);
router.get('/:username/projects/:project_name', ProjectController.findByNameAndOpenProject);
router.post('/projects/:project_id/files/upload', ProjectController.uploadFiles);
router.get('/:username/projects/:project_name/files/:file_name', ProjectController.getProjectFile);

export default router;
