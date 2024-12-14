import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
  } from 'sequelize-typescript';
  import Projects from './project.model'; // Adjust import path as necessary
import AmenityList from '../amenityList.model';
@Table({
  tableName: 'amenities',
})
class Amenities extends Model {
  @ForeignKey(() => Projects)
  @Column({
    type: DataType.STRING, // Matches `project_id` type in `Projects`
    allowNull: false,
  })
  project_id!: string;

  @ForeignKey(() => AmenityList)
  @Column({
    type: DataType.STRING, // Matches `amenity_id` type in `AmenityList`
    allowNull: false,
  })
  amenity_id!: string;

  @BelongsTo(() => Projects)
  project!: Projects;

  @BelongsTo(() => AmenityList)
  amenity!: AmenityList;
}
export default Amenities;
