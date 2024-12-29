import logger from "../../config/logger";
import Projects from "../../models/projects/project.model"
import Remarks from "../../models/projects/remark.model";


export class RemarkService{
    

    public createRemark =async(projectId: string, data: string) =>{

        
            const project = await Projects.findByPk(projectId);

            if(!project){
                throw new Error('NotFound')
                
            }

            const remark = await Remarks.create({project_id:projectId, remark:data});

            return remark;


      
    }
    
    public editRemark = async (projectId: string, data: string) => {
        try {
          const project = await Projects.findByPk(projectId);
      
          if (!project) {
            logger.error(`Project not found with ID: ${projectId}`);
            throw new Error('Project not found');
          }
      
          let remark = await Remarks.findOne({ where: { project_id: projectId } });
      
          if (!remark) {
            logger.info(`No existing remark found for project ID: ${projectId}, creating a new one.`);
            remark = await Remarks.create({ project_id: projectId, remark: data });
          } else {
            remark.remark = data;
            await remark.save();
          }
      
          logger.info(`Remark updated for project ID: ${projectId}`);
          return remark;
        } catch (error) {
          logger.error('Error editing remark:', error);
          throw error;
        }
      };



    


}