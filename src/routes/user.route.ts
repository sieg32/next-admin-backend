import { Router, Request, Response } from 'express';
import { login, register, verifyToken } from '../controllers/user.controller';
import authorize from '../middlewares/authorization.middleware';


const router = Router();


router.post('/login', login)
router.post('/register', register)
router.post('/verify', authorize, verifyToken)

export default router;