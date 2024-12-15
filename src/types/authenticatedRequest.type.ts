import { Request } from "express";


export interface AuthenticatedUser {
    user_id: string; 
    email: string;
    user_type: string;
  }

  
export  interface AuthenticatedRequest extends Request{
    user?:AuthenticatedUser;
}