import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import ulid from 'ulidx';
  import Project from './project.model'; // Assuming Project model is in the same directory
  import PropertyUnit from './propertyUnit.model'; // Assuming PropertyUnit model is in the same directory
  
  @Table({
    tableName: 'images',
  })
  class Images extends Model {
    @Column({
      type: DataType.STRING,
      defaultValue: () => ulid.ulid(), // Generates a ULID dynamically
      primaryKey: true,
      allowNull: false,
    })
    image_id!: string;
  
    // Foreign key to the Project table
    @ForeignKey(() => Project)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    project_id!: string;
  
    @BelongsTo(() => Project)
    project!: Project;
  
    // Foreign key to the PropertyUnit (Unit) table
    @ForeignKey(() => PropertyUnit)
    @Column({
      type: DataType.INTEGER,
      allowNull: true, // Allow null if the image is not related to a specific unit
    })
    unit_id!: number;
  
    @BelongsTo(() => PropertyUnit)
    unit!: PropertyUnit;
  
    // File name of the image
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    file_name!: string;
  
    // AWS S3 image link
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    image_url!: string;

    
  }
  
  export default Images;
  