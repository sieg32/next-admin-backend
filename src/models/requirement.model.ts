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

@Table({
    tableName: 'requirement',
    timestamps:false
  })
  class Requirement extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => ulid()) // Unique ID for each amenity
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    requirement_id!: string;
  
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

    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    rera_id?: string; 

    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    description?: string; 


    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    city?: string; 


    

  }
  export default Requirement;
  