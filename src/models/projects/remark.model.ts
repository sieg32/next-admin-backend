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

@Table({
  tableName: 'remarks',
})
class Remarks extends Model {
  @ForeignKey(() => Projects)
  @Column({
    type: DataType.STRING, // Matches `project_id` type in `Projects`
    allowNull: false,
  })
  project_id!: string;

  @BelongsTo(() => Projects)
  project!: Projects;


  @Column({
    type: DataType.TEXT, // Matches `project_id` type in `Projects`
    allowNull: true,
  })
  remark!: string;

  
}
export default Remarks;
