import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
    PrimaryKey,
    AllowNull,
    Default,
  } from 'sequelize-typescript';
 
import { ulid } from 'ulidx';
import Projects from './projects/project.model';
@Table({
    tableName: 'inquiry',
    timestamps:false
  })
  class Inquiry extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => ulid()) // Unique ID for each amenity
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    inquiry_id!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    name?: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    phone?: string; 
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    email?: string; 

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    type?: string; 


    @ForeignKey(() => Projects)
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    project_id!: string;
  
    @BelongsTo(() => Projects)
    project!: Projects;

  }
  export default Inquiry;
  