// src/routes/project.routes.ts

import { Router, Request, Response } from 'express';
import {  addAmenityController, addBrochureController, addImages, addProjectText, addPropertyUnit, getAllProjects, updateProjectTextInfo, updatePropertyUnit } from '../controllers/project.controller';
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

router.post('/propertyUnit/:projectId', addPropertyUnit);
router.patch('/propertyUnit/:projectId', updatePropertyUnit);

router.post('/amenities/:projectId', addAmenityController);



export default router;
