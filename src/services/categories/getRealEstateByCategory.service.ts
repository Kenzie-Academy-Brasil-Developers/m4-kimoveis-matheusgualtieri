import { AppDataSource } from "../../data-source";
import Category from "../../entities/categories.entity";
import {
  TCategory,
  TCategoryRepo,
} from "../../interfaces/categories.interfaces";
import { realEstateByCategorySchema } from "../../schemas/categories.schemas";

const getRealEstateByCategoryService = async (
  id: number
): Promise<TCategory> => {
  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);

  const allRealEstateByCategory: Category | null = await categoryRepo.findOne({
    where: { id: id },
    relations: {
      realEstate: true,
    },
  });
  return realEstateByCategorySchema.parse(allRealEstateByCategory);
};

export default getRealEstateByCategoryService;
