import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Category from "../entities/categories.entity";
import { AppError } from "../error";
import { TCategoryRepo } from "../interfaces/categories.interfaces";

const checkIfCategoryExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);

  const category: boolean | null = await categoryRepo.exist({
    where: {
      id: Number(req.params.id),
    },
  });
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  return next();
};

export default checkIfCategoryExistMiddleware;
