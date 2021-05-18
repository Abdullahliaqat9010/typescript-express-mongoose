import { Request, Response } from "express";
import { HttpStatusCodes } from "utilities";

const badRequest = (req: Request, res: Response) => {
  return res.status(HttpStatusCodes.BAD_REQUEST).json({});
};

export const ErrorController = { badRequest };
