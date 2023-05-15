import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import { TRealEstateRepo } from "../../interfaces/realEstate.interfaces";

const getRealEstatesService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: TRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const allRealEstates: Array<RealEstate> = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });
  return allRealEstates;
};

export default getRealEstatesService;
