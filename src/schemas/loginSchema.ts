import joi from 'joi';
import { ILoginData } from '../types/authTypes';

const authSchema = joi.object<ILoginData>({
  username: joi.string().required().label("username is required"),
  password: joi.string().required().label("password is required"),
});

export default authSchema;