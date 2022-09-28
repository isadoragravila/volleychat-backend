import { NextFunction, Request, Response } from "express";

export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  if (error.code === 'schema_error') {
    return res.status(422).send(error.message);
  }
  if (error.code === 'unauthorized_error') {
    return res.status(401).send(error.message);
  }
  if (error.code === 'notfound_error') {
    return res.status(404).send(error.message);
  }
  if (error.code === 'conflict_error') {
    return res.status(409).send(error.message);
  }
  return res.sendStatus(500);
}