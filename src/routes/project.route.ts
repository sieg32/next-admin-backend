// src/routes/project.routes.ts

import { Router, Request, Response } from 'express';
import {  addAmenityController, addBrochureController, addImages, addProjectText, addPropertyUnit, getAllProjects, getAmenityList, getProjectById, updateProjectTextInfo, updatePropertyUnit, updateVisibility } from '../controllers/project.controller';
import upload from '../middlewares/multer.middleware';

const router = Router();

// @route   GET /api/v1/project
// @desc    Get all projects
router.get('/', getAllProjects);
router.get('/detail/:projectId', getProjectById);

// @route   GET /api/v1/project/:id
// @desc    Get project by ID
// router.get('/:id', getProjectById);



router.post('/basic', addProjectText)
router.patch('/basic', updateProjectTextInfo)

router.post('/images/:projectId', [upload.array('images') , addImages]);
router.post('/brochure/:projectId', [upload.array('brochure'), addBrochureController])

router.post('/propertyUnit/:projectId', addPropertyUnit);
router.patch('/propertyUnit/:projectId', updatePropertyUnit);

router.get('/amenities', getAmenityList);
router.post('/amenities/:projectId', addAmenityController);


router.post('/visibility/:projectId', updateVisibility);


export default router;
