import { Sequelize } from "sequelize-typescript";
import config from "./config";
import Users from "../models/users/user.model";
import logger from "./logger";
import Projects from "../models/projects/project.model";
import Images from "../models/projects/Image.model";
import Brochures from "../models/projects/brochure.model";
import PropertyUnit from "../models/projects/propertyUnit.model";
import Amenities from "../models/projects/amenity.model";
import AmenityList from "../models/amenityList.model";

// Initialize Sequelize with your database connection details
const sequelize_deals = new Sequelize("deals", config.db.USER, config.db.PASSWORD, {
    host: config.db.HOST,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    models:[ Projects,PropertyUnit, Images,  Brochures, Amenities, AmenityList],
    logging:(msg)=>{logger.info(msg)}
});
const sequelize_admin = new Sequelize("admin", config.db.USER, config.db.PASSWORD, {
    host: config.db.HOST,
    dialect: 'postgres',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    models:[Users],
    logging:(msg)=>{logger.info(msg)}
});




// Test the database connection
sequelize_deals.authenticate()
    .then(() => {
        console.log('Connection has been established successfully for deals db');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize_admin.authenticate()
    .then(() => {
        console.log('Connection has been established successfully for admin db');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    
export { sequelize_deals, sequelize_admin};