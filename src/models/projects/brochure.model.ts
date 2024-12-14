import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import ulid from 'ulidx';
  import Project from './project.model'; // Adjust the import path as needed
  
  @Table({
    tableName: 'brochures',
  })
  class Brochure extends Model {
    @Column({
      type: DataType.STRING,
      defaultValue: () => ulid.ulid(), // Generates a ULID dynamically
      primaryKey: true,
      allowNull: false,
    })
    brochure_id!: string;
  
    // Foreign key to the Project table
    @ForeignKey(() => Project)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    project_id!: string;
  
    @BelongsTo(() => Project)
    project!: Project;
  
    // File name of the brochure
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    file_name!: string;
  
    // AWS S3 brochure link
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    brochure_url!: string;
  }
  
  export default Brochure;