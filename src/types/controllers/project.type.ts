export type Coordinates = {
    latitude: number | null;
    longitude: number | null;
  };
  
 export type Location = {
    city: string;
    state: string;
    landmark: string;
    address: string;
    coordinates: Coordinates;
  };
  
 export type PriceRange = {
    min: number | null;
    max: number | null;
  };

  export type LandExtra = {
    fencing?:string|null;
    position?:string| null;
    approach?: string | null;
    distance_from_orr?: string | null;
    soil_type?:string| null;
  }
  export type HotelExtra = {
    rental_yield?:string|null;
    accessibility?:boolean|null;
    additional_room?:string|null;
  }
  
 export type ProjectDataText = {
    name: string;
    type:'hotel'| 'land'| 'project';
    category:string;
    description?: string;
    status?: string;
    location?: Location;
    start_date?: Date;
    land_extra?:LandExtra;
    hotel_extra?:HotelExtra;
    completion_date?: Date;
    total_units?: number;
    project_area?:number;
    project_property?:string;
    price_range?: PriceRange;
    rera_id?: string;
    why_us?:string;
    
  };
  

export type ProjectUpdateData = {
  name: string;
  type:'hotel'| 'land'| 'project';
  category:string;
  description?: string;
  status?: string;
  location?: Location;
  start_date?: Date;
  land_extra?:LandExtra;
  hotel_extra?:HotelExtra;
  completion_date?: Date;
  total_units?: number;
  project_area?:number;
  project_property?:string;
  price_range?: PriceRange;
  rera_id?: string;
  why_us?:string;
}

export type PropertyUnitData = {
    
    // project_id: string; // Foreign key to the Projects table
    property_type: string;
    bedroom_count?: number;
    bathroom_count?: number;
    parking?: boolean;
    area?: number;
    super_area?: number;
    areaMax?: number;
    areaMin?: number;
    floor_number?: number;
    facing_direction?: string;
    balcony_count?: number;
    construction_status?: string;
    construction_year?: string;
    availability_status?: string;
    price?: number;
    additional_features?: string;
  }