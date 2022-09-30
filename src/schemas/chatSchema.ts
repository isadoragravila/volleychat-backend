import joi from 'joi';
import { IChatSchema } from '../types/chatTypes';

const chatSchema = joi.object<IChatSchema>({
    title: joi.string().max(30).required(),
    description: joi.string().required(),
  });

  export default chatSchema;