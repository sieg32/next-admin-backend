import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  import ulid from 'ulidx';

  @Table({
    tableName: 'users',
    timestamps:true
  })
  class Users extends Model {
    
    @Column({
      type: DataType.STRING,  // Change to STRING for ULID
      defaultValue: () => ulid.ulid(),  // Generates a ULID dynamically
      primaryKey: true,
      allowNull: false,
    })
    user_id!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    username!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    email!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password!: string;
  
    @Column({
      type: DataType.ENUM('admin', 'other'),  // Ensure correct ENUM values
      allowNull: false,
    })
    user_type!: 'admin' | 'other';
  
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    })
    created_at!: Date;
  }
  
  export default Users;
  