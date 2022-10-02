import joi from 'joi';
import { IMessageSchema } from '../types/messageTypes';

const messageSchema = joi.object<IMessageSchema>({
    content: joi.string().required()
  });

  export default messageSchema;