import joi from 'joi';
import { ILoginData } from '../types/authTypes';

const authSchema = joi.object<ILoginData>({
    username: joi.string().required(),
    password: joi.string().min(8).required(),
  });

  export default authSchema;