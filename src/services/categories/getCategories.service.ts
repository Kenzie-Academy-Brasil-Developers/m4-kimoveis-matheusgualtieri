import { AppDataSource } from "../../data-source";
import Category from "../../entities/categories.entity";
import {
  TCategory,
  TCategoryRepo,
} from "../../interfaces/categories.interfaces";
import { categoriesArrSchema } from "../../schemas/categories.schemas";

const getCategoriesService = async (): Promise<TCategory[]> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);

  const allCategories: Array<Category> = await categoryRepo.find();

  return categoriesArrSchema.parse(allCategories);
};

export default getCategoriesService;
