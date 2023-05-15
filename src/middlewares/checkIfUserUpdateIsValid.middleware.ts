import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const checkIfUserUpdateIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userId: number = res.locals.token.id;
  const paramsId: number = Number(req.params.id);
  const userValid = res.locals.token.admin;

  if (!userValid && paramsId != userId) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default checkIfUserUpdateIsValidMiddleware;
