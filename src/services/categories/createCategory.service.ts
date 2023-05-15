import { AppDataSource } from "../../data-source";
import Category from "../../entities/categories.entity";
import {
  TCategory,
  TCategoryRepo,
  TCategoryRequest,
} from "../../interfaces/categories.interfaces";
import { categorySchema } from "../../schemas/categories.schemas";

const createCategoryService = async (
  data: TCategoryRequest
): Promise<TCategory> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);

  const category: Category = categoryRepo.create(data);

  await categoryRepo.save(category);

  return categorySchema.parse(category);
};

export default createCategoryService;
