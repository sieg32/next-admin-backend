import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import Projects from './project.model'; // Assuming Project model is in the same directory
  
  @Table({
    tableName: 'property_unit',
  })
  class PropertyUnit extends Model {

    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    unit_id!: number;
  
    // Foreign key to the Project table
    @ForeignKey(() => Projects)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    project_id!: string;
  
    @BelongsTo(() => Projects)
    project!: Projects;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    property_type!: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    bedroom_count!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    bathroom_count!: number;
  
    @Column({
      type: DataType.BOOLEAN,
      allowNull: true,
    })
    parking!: boolean;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    area!: number;


    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    super_area!: number;

  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    areaMax!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    areaMin!: number;
  
    // Additional information
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    floor_number!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    facing_direction!: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    balcony_count!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    construction_status!: string;
  
    // More information
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    construction_year!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    availability_status!: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: true,
    })
    price!: number;
  
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    additional_features!: string;
  
   
  }
  
  export default PropertyUnit;
  