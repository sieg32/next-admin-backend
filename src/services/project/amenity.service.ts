import Amenities from "../../models/projects/amenity.model";

import AmenityList from "../../models/amenityList.model";
import logger from "../../config/logger";

export class AmenityService {
    private Amenities : typeof Amenities;
    private AmenityList :typeof AmenityList;


    constructor (){
        this.Amenities = Amenities;
        this.AmenityList = AmenityList;
    }

    public async getAmenityList(){
        try {
            
            const data =await this.AmenityList.findAll();
            return data;
        } catch (error) {
            logger.error('error while fetching amenity list',error)
            throw new Error('internalError')
        }

    }

    public async addAmenity(projectId:string, amenitiesArray:string[]){
      
            
            const data = await Promise.all(amenitiesArray.map((amenityId)=>{
                return Amenities.create({project_id:projectId, amenity_id:amenityId})
            }))

            return data;
      
        

    }

}