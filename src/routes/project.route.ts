// src/routes/project.routes.ts

import { Router, Request, Response } from 'express';
import {  addBrochureController, addImages, addProjectText, getAllProjects, updateProjectTextInfo } from '../controllers/project.controller';
import upload from '../middlewares/multer.middleware';

const router = Router();

// @route   GET /api/v1/project
// @desc    Get all projects
router.get('/', getAllProjects);

// @route   GET /api/v1/project/:id
// @desc    Get project by ID
// router.get('/:id', getProjectById);



router.post('/basic', addProjectText)
router.patch('/basic', updateProjectTextInfo)

router.post('/images/:projectId', [upload.array('images') , addImages]);
router.post('/brochure/:projectId', [upload.array('brochure'), addBrochureController])



export default router;
