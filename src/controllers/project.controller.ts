import { ProjectService } from '../services/project/basic.service';
import Projects from '../models/projects/project.model';
import { ProjectDataText, ProjectUpdateData, PropertyUnitData } from '../types/controllers/project.type';
import { Request, Response } from 'express';
import logger from '../config/logger';
import FileService from '../services/project/file.service';
import s3 from '../config/s3';
import Images from '../models/projects/Image.model';
import Brochures from '../models/projects/brochure.model';
import PropertyUnit from '../models/projects/propertyUnit.model';
import Amenities from '../models/projects/amenity.model';
import { PropertyUnitService } from '../services/project/propertyUnit.service';
import { AmenityService } from '../services/project/amenity.service';
import AmenityList from '../models/amenityList.model';
import { DeletionService } from '../services/project/deletion.service';
import { RemarkService } from '../services/project/remark.service';
import Remarks from '../models/projects/remark.model';

const projectService = new ProjectService(Projects);
const propertyUnitService = new PropertyUnitService(PropertyUnit, Projects)
const fileService = new FileService(s3)
const amenityService = new AmenityService();
const deletionService = new DeletionService();
const remarkSerive = new RemarkService();


export const getAllProjects = async (req: Request, res: Response):Promise<void > => {
    try {
       
        const data = await Projects.findAll({include:[Images, Brochures, PropertyUnit, Amenities, Remarks], order:[['createdAt', 'DESC']]});
        res.status(200).json(data)
    } catch (error) {
      console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
}


export const getProjectById = async (req: Request, res: Response):Promise<void > => {
    try {
        const { projectId } = req.params;
        const project = await Projects.findByPk(projectId,{include:[Images, PropertyUnit, Brochures,{model:Amenities , include:[AmenityList]} ]});
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return ;
        }
        res.status(200).json({success:true, data:project});
    } catch (error) {
        res.status(500).json({ success:false, message: 'Server error' });
    }
}



export const addProjectText=async (req:Request, res:Response) : Promise<void>=>{
try {
    
  
  const projectData:ProjectDataText = req.body;
  console.log(projectData)

    const project =await projectService.addProjectText(projectData);


    if(project.project_id){
        res.status(201).json({success:true, message:'Created', data: project})
    }

} catch (error) {
    logger.error("error creating project", error)
    res.status(500).json({ success: false, message: "Internal server error" })
    
}

}



export const addPropertyUnit=async (req:Request, res:Response) : Promise<void>=>{
try {
    
  const {projectId} = req.params;
  const propertyUnitData:PropertyUnitData = req.body;
  console.log(projectId);
  console.log(propertyUnitData)

    const project =await propertyUnitService.addPropertyUnitData(projectId,propertyUnitData);


    if(project.project_id){
        res.status(201).json({success:true, message:'Created', datta: project})
    }

} catch (error) {

  if(error.message === 'ProjectNotFound'){
    logger.error('project not found')
    res.status(404).json({success:false, message:"project not found"})
  }else{

    logger.error("error creating project", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
    
}

}




export const updateProjectTextInfo = async (req: Request, res: Response):Promise<void> => {
    try {
      // Extract project ID from the URL parameters
      const { projectId } = req.params;
  
      // Extract the builder's ID from the token in `res.locals`
     
  
      // Extract the project update data from the request body
      const updateData:ProjectUpdateData = req.body;
  
      // Call the service to update the project
      const updatedProject = await projectService.updateProjectTextInfo(
        projectId,
       
        updateData
      );
  
      // If the update is successful, send a success response
       res.status(200).json({
        success: true,
        message: "Project textual information updated successfully",
        data: updatedProject,
      });
    } catch (error) {
      logger.error("Error updating project textual info:", error);
  
      // Handle errors: differentiate between 'Not Found', 'Unauthorized', and 'Internal Server Error'
      if (error.message === "Project not found") {
         res.status(404).json({ success: false, message: "Project not found" });
      }else if (error.message === "User unauthorized, token verification failed") {
         res.status(401).json({ success: false, message: "Unauthorized" });
      }else{

          res.status(500).json({ success: false, message: "Internal server error" });
      }
  
      // If other errors occur, send a 500 Internal Server Error response
    }
  };

export const updatePropertyUnit = async (req: Request, res: Response):Promise<void> => {
    try {
      // Extract project ID from the URL parameters
      const { propertyUnitId  } = req.params ;
  
      // Extract the builder's ID from the token in `res.locals`
     
  
      // Extract the project update data from the request body
      const updateData:Partial<PropertyUnitData> = req.body;
  
      // Call the service to update the project
      const updatedProject = await propertyUnitService.updatePropertyUnit(
        parseInt(propertyUnitId) ,
       
        updateData
      );
  
      // If the update is successful, send a success response
       res.status(200).json({
        success: true,
        message: "propertyUnit textual information updated successfully",
        data: updatedProject,
      });
    } catch (error) {
      logger.error("Error updating Property textual info:", error);
  
      // Handle errors: differentiate between 'Not Found', 'Unauthorized', and 'Internal Server Error'
      if (error.message === "PropertyUnitNotFound") {
         res.status(404).json({ success: false, message: "Project not found" });
      }else if (error.message === "User unauthorized, token verification failed") {
         res.status(401).json({ success: false, message: "Unauthorized" });
      }else{

          res.status(500).json({ success: false, message: "Internal server error" });
      }
  
      // If other errors occur, send a 500 Internal Server Error response
    }
  };



  export const addImages = async (req: Request, res: Response): Promise<void> => {
    try {
      // Transform and validate request body using DTO
    
        const projectId =  req.params.projectId
        const imageFiles= req.files
    
        console.log(imageFiles)

      

      // Call the service layer to add images
      const uploadedImages = await fileService.addImages(projectId, imageFiles);

       res.status(200).json({
        success: true,
        message: 'Images uploaded successfully',
        data: uploadedImages,
      });
      
    } catch (error) {
      console.error('Error uploading images:', error);

       res.status(500).json({ success: false, msg: 'Internal server error' });
      return
    }
  };



export const addBrochureController = async (req: Request, res: Response):Promise<void> => {
    try {
      const { projectId } = req.params;  // Assuming projectId is passed as a URL parameter
  
      // Check if a file has been uploaded
      if (!req.files) {
        return res.status(400).json({
          success: false,
          message: 'No brochure file found in the request',
        });
      }
  
      // Call the ImageService to upload the brochure
      const brochureData = await fileService.addBrochure(projectId, req.files);
  
      res.status(200).json({
        success: true,
        message: 'Brochure uploaded successfully',
        data: brochureData,
      });
    } catch (error) {
      console.error('Error uploading brochure:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload brochure',
        error: error.message,
      });
    }
  };


export const getAmenityList = async (req:Request, res:Response)=>{
  try {
    const data =await amenityService.getAmenityList();
    res.status(200).json({success:true, data:data})
    
  } catch (error) {
    logger.error(error)
    res.status(500).json({success:false, message:'unable to fetch amenity list'});
  }

}



export const addAmenityController = async(req: Request, res: Response):Promise<void> => {

  const {projectId} = req.params;
  const amenitiesArray:string[] = req.body.amenities;



  if(!projectId){
    res.status(400).json({success:false, message:'please provide project id'});
    return;
  }

  const project = await Projects.findByPk(projectId);
  if(!project){
    res.status(404).json({success:false, message:'project not found'});
    return;
  }
  if(!(Array.isArray(amenitiesArray) && amenitiesArray.length >= 0)){
    res.status(400).json({success:false, message:'provide amenities to set'});
    return;
  }

  try {
    
    const amenities = await amenityService.addAmenity(projectId, amenitiesArray);

    res.status(201).json({success:true, })
  } catch (error) {

    logger.error(error);
    res.status(500).json({success:false, message:"internal server error"})

  }



}

export const updateVisibility = async(req: Request, res: Response):Promise<void> => {
  const {projectId} = req.params;
  const {visibility} = req.body;

  try {

    const project =await projectService.changeVisibility(projectId, visibility);


    if(project){
      res.status(200).json({success:true, message:'successfully updated'})
    }
    
  } catch (error) {
    if(error instanceof Error && error.message === 'NoUpdate'){
      res.status(401).json({success:false, message:'no updates'})
    }else{
      res.status(500).json({success:false, message:'error occured while updating'})
    }
    
  }
}



export const deleteProject = async(req: Request, res: Response):Promise<void> => {
  const {projectId} = req.params;
   try {
    await deletionService.deleteProject(projectId); 
    res.status(200).json({success:true, message:'successfully deleted'})  
  } catch (error) {
    if(error instanceof Error && error.message === 'NotFOund'){
      res.status(404).json({success:false, message:'not found'})
    }else{
      res.status(500).json({success:false, message:'error occured while updating'})
    }
  }
}



export const createRemark = async (req:Request , res:Response)=>{
  const {projectId, data} = req.body;

  if(!data){
    res.status(403).json({success:false, message:'please provide remark'});
    return;
  }
try {
  
  const remark =await remarkSerive.createRemark(projectId, data);

 
  res.status(201).json({success:true, message:'remark created', data:remark});
} catch (error) {
  console.log(error)
  if(error.message === 'NotFound'){
    res.status(404).json({success:false, message:'project not found'});

  }else{
    res.status(500).json({success:false, message:'something went wrong'})
  }
  
}

  
}


export const editRemark = async (req:Request , res:Response)=>{
  const {projectId, data} = req.body;

  if(!data){
    res.status(403).json({success:false, message:'please provide remark'});
    return;
  }
try {
  
  const remark =await remarkSerive.editRemark(projectId, data);

  res.status(200).json({success:true, message:'remark edited', data:remark});
} catch (error) {

  if(error.message === 'NotFound'){
    res.status(404).json({success:false, message:'project not found'});

  }else{
    res.status(500).json({success:false, message:'something went wrong'})
  }
  
}

  
}

