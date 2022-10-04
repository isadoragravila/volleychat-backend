import joi from 'joi';
import { IRegisterData } from '../types/authTypes';

const authSchema = joi.object<IRegisterData>({
  username: joi.string().pattern(/^[a-zA-Z0-9._-]*$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).pattern(/^\S*$/).required(),
    image: joi.string().uri().required(),
    bio: joi.string().max(150).required()
  });

  export default authSchema;