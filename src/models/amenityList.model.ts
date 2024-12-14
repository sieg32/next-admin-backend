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
    tableName: 'amenityList',
  })
  class AmenityList extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Default(() => ulid()) // Unique ID for each amenity
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    amenity_id!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    description?: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    icon?: string; // Icon URL or identifier
  }
  export default AmenityList;
  