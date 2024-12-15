import  Users  from '../models/users/user.model'; // Assuming you have the Users model set up
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../types/authenticatedRequest.type';

const JWT_SECRET = process.env.JWT_SECRET || 'nvidiagt710';

export async function loginService(email: string, password: string): Promise<string | Error> {
    try {
      // Fetch the user by email
      const user = await Users.findOne({ where: { email } });
      
      if (!user) {
        throw new Error('UserNotFound');
      }


      // Compare the provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new Error('InvalidCredential');
      }
  
      // Generate a JWT token if the credentials are valid
      const token = jwt.sign(
        {
          user_id: user.user_id,
          email: user.email,
          user_type: user.user_type,
        },
        JWT_SECRET,
        {
          expiresIn: '1h', // Token expires in 1 hour
        }
      );
  
      return token;
    } catch (error) {
        
      // Return the error message if any issues arise during login
       throw new Error(error.message);
    }
  }


  

export async function registerService(
    username: string,
    email: string,
    password: string,
    user_type: 'admin' | 'other' // Type is restricted to the allowed values
  ): Promise<string | Error> {
    try {
      // Check if the email is already registered
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('AlreadyExist');
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user in the database
      const newUser = await Users.create({
        username,
        email,
        password: hashedPassword, // Store the hashed password
        user_type,
      });
  
      // Generate a JWT token upon successful registration
      const token = jwt.sign(
        {
          user_id: newUser.user_id,
          email: newUser.email,
          user_type: newUser.user_type,
        },
        JWT_SECRET,
        {
          expiresIn: '1h', // Token expires in 1 hour
        }
      );
  
      return token; // Return the token to the client
    } catch (error) {
      throw new Error(error.message); // Return an error if something goes wrong
    }
  }



export async function verifyUserService(user:AuthenticatedUser): Promise<boolean | Error> {
  try {
    // Fetch the user by email
    const userData = await Users.findByPk(user.user_id);
    
    if (!user) {
      throw new Error('UserNotFound');
      
    }

    if(user.user_type === userData?.user_type){
      return true;
    }else{
      return false;
    }

    // Compare the provided password with the hashed password in the database
  
    
   
    // Generate a JWT token if the credentials are valid
    

    
  } catch (error) {
      
    // Return the error message if any issues arise during login
     throw new Error(error.message);
  }
}
