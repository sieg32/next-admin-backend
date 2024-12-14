import { Table, Column, Model, DataType, Default, PrimaryKey, AllowNull, HasMany, HasOne } from 'sequelize-typescript';
import {ulid} from 'ulidx';
import Amenities from './amenity.model';
import Images from './Image.model';
import PropertyUnit from './propertyUnit.model';
import Brochure from './brochure.model';

@Table({
  tableName: 'projects',
})
class Projects extends Model {

  @AllowNull(false)
  @Default(() => ulid())
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  project_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  slug!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.ENUM('project', 'land', 'hotel' ),
    allowNull: false,
  })
  type!: 'project'| 'land' | 'hotel';

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  status?: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: {
      city: '',
      state: '',
      landmark: '',
      address: '',
      coordinates: {
        latitude: null,
        longitude: null,
      },
    },
  })
  location?: {
    city: string;
    state: string;
    landmark: string;
    address: string;
    coordinates: {
      latitude: number | null;
      longitude: number | null;
    };
  };

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  start_date?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  completion_date?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  total_units?: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: {
      min: null,
      max: null,
    },
  })
  price_range?: {
    min: number | null;
    max: number | null;
  };

 

  // Assuming images are stored as an array of URLs

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  rera_id?: string;

  @Column({
    type:DataType.INTEGER,
    allowNull:true,
  })
  Project_area?:number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  project_property?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  builder_name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  builder_description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  builder_logo?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  hot_deals_flag!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_public?: boolean;


  @HasMany(() => Amenities)
  amenities!: Amenities[];

  @HasMany(() => PropertyUnit)
  units!: PropertyUnit[];

  @HasMany(() => Images)
  images!: Images[];

  @HasOne(()=>Brochure)
  brochure!:Brochure;
  
}

export default Projects;
