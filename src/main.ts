import express, { Request, Response } from 'express';
import config from './config/config';
import userRouter from './routes/user.route'
import projectRouter from './routes/project.route'
import {sequelize_deals, sequelize_admin} from './config/database';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json())



app.use("/api/v1/user", userRouter );
app.use("/api/v1/project", projectRouter);


const start =async ()=>{
  await sequelize_deals.sync({});
  await sequelize_admin.sync();
  
  app.listen(config.PORT, () => {
   
      console.log(`Server running at http://localhost:${config.PORT}`);
    }); 
}
start()



  