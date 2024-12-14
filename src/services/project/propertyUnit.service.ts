import Projects from "../../models/projects/project.model";
import PropertyUnit from "../../models/projects/propertyUnit.model";
import { PropertyUnitData } from "../../types/controllers/project.type";

export class PropertyUnitService {

    private propertyUnit:typeof PropertyUnit;
    private projects:typeof Projects;

    constructor (PropertyUnitModel: typeof PropertyUnit, projectsModel: typeof Projects){
        this.propertyUnit = PropertyUnit;
        this.projects = Projects;
    }





    public async addPropertyUnitData(projectId:string, propertyUnitData:PropertyUnitData) {


        try {
          const project = this.projects.findByPk(projectId);
          if(!project){
            throw new Error('projectNotFound')
          }

          const data = this.propertyUnit.create({ ...propertyUnitData, project_id:projectId})

          return data;

          
        } catch (error) {
          if(error.message ==='ProjectNotFound'
          ){
            logger.error(error)
            throw new Error('ProjectNotFound')
          }else{
            logger.error(error)
            throw new Error('InternalServerError')
          }
        }
      }



      public async updatePropertyUnit(
        propertyUnitId: number,
        updateData: Partial<PropertyUnitData>
      ) {
        // Find the property unit by its primary key (ID)
        const propertyUnit = await this.propertyUnit.findByPk(propertyUnitId);
      
        if (!propertyUnit) {
          throw new Error("PropertyUnitNotFound");
        }
      
        // Update only the fields that are provided
        const updatedFields: Partial<PropertyUnitData> = {};
      
        if (updateData.property_type) updatedFields.property_type = updateData.property_type;
        if (updateData.bedroom_count) updatedFields.bedroom_count = updateData.bedroom_count;
        if (updateData.bathroom_count) updatedFields.bathroom_count = updateData.bathroom_count;
        if (updateData.parking !== undefined) updatedFields.parking = updateData.parking;
        if (updateData.area) updatedFields.area = updateData.area;
        if (updateData.super_area) updatedFields.super_area = updateData.super_area;
        if (updateData.areaMax) updatedFields.areaMax = updateData.areaMax;
        if (updateData.areaMin) updatedFields.areaMin = updateData.areaMin;
        if (updateData.floor_number) updatedFields.floor_number = updateData.floor_number;
        if (updateData.facing_direction)
          updatedFields.facing_direction = updateData.facing_direction;
        if (updateData.balcony_count) updatedFields.balcony_count = updateData.balcony_count;
        if (updateData.construction_status)
          updatedFields.construction_status = updateData.construction_status;
        if (updateData.construction_year)
          updatedFields.construction_year = updateData.construction_year;
        if (updateData.availability_status)
          updatedFields.availability_status = updateData.availability_status;
        if (updateData.price) updatedFields.price = updateData.price;
        if (updateData.additional_features)
          updatedFields.additional_features = updateData.additional_features;
      
        // Update the property unit in the database
        await propertyUnit.update(updatedFields);
      
        return propertyUnit;
      }



}