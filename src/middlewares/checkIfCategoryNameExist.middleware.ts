import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import Category from "../entities/categories.entity";
import { AppError } from "../error";
import { TCategoryRepo } from "../interfaces/categories.interfaces";

const checkIfCategoryNameExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);

  const category: boolean | null = await categoryRepo.exist({
    where: {
      name: req.body.name,
    },
  });
  if (category) {
    throw new AppError("Category already exists", 409);
  }
  return next();
};

export default checkIfCategoryNameExistMiddleware;
