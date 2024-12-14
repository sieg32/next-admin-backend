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



    public async addAmenity(projectId:string, amenitiesArray:string[]){
      
            
            const data = await Promise.all(amenitiesArray.map((amenityId)=>{
                return Amenities.create({project_id:projectId, amenity_id:amenityId})
            }))

            return data;
      
        

    }

}