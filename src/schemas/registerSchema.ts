import joi from 'joi';
import { IRegisterData } from '../types/authTypes';

const authSchema = joi.object<IRegisterData>({
  username: joi.string().pattern(/^[a-zA-Z0-9._-]*$/).required().label("username must contain letters and/or numbers and/or '.', '-', '_'"),
  email: joi.string().email().required().label("email is required"),
  password: joi.string().min(8).pattern(/^\S*$/).required().label("password must contain letters and/or numbers and/or special characters and at least 8 characters"),
  image: joi.string().uri().required().label("image must be a valir url"),
  bio: joi.string().max(150).required().label("bio must contain at most 150 characters")
});

export default authSchema;