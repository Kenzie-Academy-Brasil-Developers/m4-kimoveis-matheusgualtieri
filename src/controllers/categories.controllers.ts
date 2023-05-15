import { Request, Response } from "express";
import {
  TCategory,
  TCategoryRequest,
} from "../interfaces/categories.interfaces";
import createCategoryService from "../services/categories/createCategory.service";
import getCategoriesService from "../services/categories/getCategories.service";
import getRealEstateByCategoryService from "../services/categories/getRealEstateByCategory.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TCategoryRequest = req.body;
  const newCategory: TCategory = await createCategoryService(data);
  return res.status(201).json(newCategory);
};

const getCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allCategories = await getCategoriesService();
  return res.status(200).json(allCategories);
};

const getRealEstateByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const allRealEstateByCategory = await getRealEstateByCategoryService(id);
  return res.status(200).json(allRealEstateByCategory);
};

export {
  createCategoryController,
  getCategoriesController,
  getRealEstateByCategoryController,
};
