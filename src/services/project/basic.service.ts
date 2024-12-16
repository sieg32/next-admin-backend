import { Model } from "sequelize-typescript";
import {createSlug} from "../../utils/createSlug";
import Projects from "../../models/projects/project.model";
import { ProjectUpdateData, PropertyUnitData } from "../../types/controllers/project.type";
import logger from "../../config/logger";

export class ProjectService {

    private project:typeof Projects;

    constructor (ProjectModel: typeof Projects){
        this.project = ProjectModel;
    }



    public async addProjectText(projectData:any){
        try {
            
      
            // Create a slug from the project name
            const projectSlug = createSlug(projectData.name);
      
      
            // Create the new project in the database
            const newProject = await this.project.create({
              
              ...projectData,
              slug:projectSlug
            });
      
            return newProject;
          } catch (error) {
            console.error("Error adding project textual info:", error);
            throw new Error("Unable to add project information.");
          }


    }





    public async updateProjectTextInfo(
        projectId: string,
        
        updateData: ProjectUpdateData
      ) {
        // Find the project by its primary key (ID)
        const project = await this.project.findByPk(projectId);
    
        if (!project) {
          throw new Error("Project not found");
        }
    
        // Check if the builder ID matches the one associated with the project
        
    
        // Update only the fields that are provided
        const updatedFields: Partial<ProjectUpdateData> = {};
    
        if (updateData.name) updatedFields.name = updateData.name;
        if (updateData.description)
          updatedFields.description = updateData.description;
        if (updateData.status) updatedFields.status = updateData.status;
        if (updateData.location)
          updatedFields.location = updateData.location;
        if (updateData.start_date) updatedFields.start_date = updateData.start_date;
        if (updateData.completion_date)
          updatedFields.completion_date = updateData.completion_date;
        if (updateData.total_units) updatedFields.total_units = updateData.total_units;
        if (updateData.price_range) updatedFields.price_range = updateData.price_range;
        if (updateData.rera_id) updatedFields.rera_id = updateData.rera_id;
    
        // Update the project in the database
        await project.update(updatedFields);
    
        return project;
      }



      public async changeVisibility(projectId:string , visibility:boolean){

        const project = await this.project.findByPk(projectId);
    
        if (!project) {
          throw new Error("Project not found");
        }

        if(project.is_public=== visibility){
          throw new Error('NoUpdate')
        }else{
          project.is_public = visibility;
          await project.save();

          return project;

        }
    
      }




}