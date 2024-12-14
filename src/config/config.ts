import { configDotenv } from "dotenv"
configDotenv()
export default {
   
        APPNAME: "MyApp",
        PORT: process.env.PORT || 5000,
        db: {
          DB_NAME:'deals',
          USER: process.env.DB_USER || 'nextUser',
          PASSWORD: process.env.DB_PASSWORD || 'nvidiagt710',
          HOST: "localhost",
        },
        s3:{
          AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID ,
          AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY ,
          AWS_REGION:process.env.AWS_REGION ,
          AWS_S3_BUCKET_NAME:'nextopson-files'
        },
        ENV_TYPE: process.env.ENV_TYPE || "developement"

      
}