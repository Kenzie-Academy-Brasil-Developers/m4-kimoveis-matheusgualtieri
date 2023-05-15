import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../entities/users.entity";
import { AppError } from "../error";
import { TUserRepo } from "../interfaces/user.interfaces";

const checkIfUserExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: boolean | null = await userRepo.exist({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return next();
};

export default checkIfUserExistMiddleware;
