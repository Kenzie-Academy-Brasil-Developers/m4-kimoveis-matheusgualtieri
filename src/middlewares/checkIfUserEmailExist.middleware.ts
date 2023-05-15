import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import User from "../entities/users.entity";
import { AppError } from "../error";
import { TUserRepo } from "../interfaces/user.interfaces";

const checkIfUserEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: boolean | null = await userRepo.exist({
    where: {
      email: req.body.email,
    },
  });
  if (user) {
    throw new AppError("Email already exists", 409);
  }
  return next();
};

export default checkIfUserEmailExistMiddleware;
