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
  
 export type ProjectDataText = {
    name: string;
    type:'hotel'| 'land'| 'project';
    category:string;
    description?: string;
    status?: string;
    location?: Location;
    start_date?: Date;
    completion_date?: Date;
    total_units?: number;
    price_range?: PriceRange;
    rera_id?: string;
    
  };
  

export type ProjectUpdateData = {
  name?: string;
  description?: string;
  status?: string;
  location?: object;
  start_date?: Date;
  completion_date?: Date;
  total_units?: number;
  price_range?: object;
  rera_id?: string;
}

export type PropertyUnitData = {
    
    project_id: string; // Foreign key to the Projects table
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