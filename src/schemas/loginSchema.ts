import joi from 'joi';
import { ILoginData } from '../types/authTypes';

const authSchema = joi.object<ILoginData>({
    username: joi.string().pattern(/^[a-zA-Z0-9._-]*$/).required(),
    password: joi.string().min(8).pattern(/^\S*$/).required()
  });

  export default authSchema;