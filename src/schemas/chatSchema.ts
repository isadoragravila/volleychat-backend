import joi from 'joi';
import { IChatSchema } from '../types/chatTypes';

const chatSchema = joi.object<IChatSchema>({
    title: joi.string().max(30).required().label("title must have at most 30 characters"),
    description: joi.string().max(150).required().label("title must have at most 150 characters"),
  });

  export default chatSchema;