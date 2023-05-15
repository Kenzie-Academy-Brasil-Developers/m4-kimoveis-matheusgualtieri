import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../entities/users.entity";
import { TUserRepo } from "../interfaces/user.interfaces";
import { AppError } from "../error";

const checkIfIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userValid = res.locals.token.admin;
  if (!userValid) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default checkIfIsAdminMiddleware;
