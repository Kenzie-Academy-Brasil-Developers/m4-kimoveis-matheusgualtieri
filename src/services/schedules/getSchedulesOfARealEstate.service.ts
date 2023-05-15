import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import { AppError } from "../../error";
import { TRealEstateRepo } from "../../interfaces/realEstate.interfaces";

const getSchedulesOfARealEstateService = async (
  id: number
): Promise<RealEstate> => {
  const realEstateRepo: TRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstates: RealEstate | null = await realEstateRepo.findOne({
    where: { id: id },
    relations: {
      address: true,
      category: true,
      schedules: { user: true },
    },
  });

  if (!realEstates) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstates;
};

export default getSchedulesOfARealEstateService;
