import { Request, Response } from "express";
import { loginService, registerService, verifyUserService } from "../services/user.service";
import logger from "../config/logger";
import { AuthenticatedRequest } from "../types/authenticatedRequest.type";


export const  login = async (req:Request, res: Response) =>{
    const {email, password}:{email:string, password:string} = req.body;

    try {
        if (!(email || password)){
            throw new Error('InvalidCredential')
            
        }
        const token = await loginService(email, password);
        
        if(token){
            res.status(200).json({success:true, token:token})
        
        }
        
    } catch (error) {
        if(error.message ==='UserNotFound'){
            res.status(404).json({success:false, message:'UserNotFound'})
            
        }else if(error.message === 'InvalidCredential'){
            res.status(403).json({success:false, message:'InvalidCredential'})
        }else{
            res.status(500).json({success:false, message:'InternalServerError'})
            logger.error(error.message)
        }

    }
}
export const  register = async (req:Request, res: Response) =>{
    const { username,
        email,
        password,
        user_type}:{username:string,  email:string, password:string , user_type:'admin' | 'other' } = req.body;

    try {
        const token = await registerService(username, email, password, user_type);
        
        if(token){
            res.status(200).json({success:true, token:token})
        
        }
        
    } catch (error) {
        if(error.message ==='UserNotFound'){
            res.status(404).json({success:false, message:'UserNotFound'})
            
        }else if(error.message === 'InvalidCredential'){
            res.status(403).json({success:false, message:'InvalidCredential'})
        }else if(error.message === 'AlreadyExist'){
            res.status(409).json({success:false, message:'email already exists'})
        }else{
            res.status(500).json({success:false, message:'InternalServerError'})
            logger.error(error.message)
        }

    }
}

 export const verifyToken =async (req:AuthenticatedRequest, res:Response)=>{
try {
    
    const isValid =await verifyUserService(req.user);
    if(isValid){
        res.status(200).json({success:false, message:'user verified'});
    }else{
        res.status(403).json({success:false, message:'user not verified'});
    }
} catch (error) {
    logger.error(error)
    res.status(500).json({success:false, message:"internal server error"});
}


 }