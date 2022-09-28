import joi from 'joi';
import { IRegisterData } from '../types/authTypes';

const authSchema = joi.object<IRegisterData>({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    image: joi.string().uri().required(),
    bio: joi.string().max(150).required()
  });

  export default authSchema;