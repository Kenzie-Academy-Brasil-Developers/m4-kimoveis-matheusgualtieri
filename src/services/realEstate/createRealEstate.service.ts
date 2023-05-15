import { AppDataSource } from "../../data-source";
import Address from "../../entities/addresses.entity";
import Category from "../../entities/categories.entity";
import RealEstate from "../../entities/realEstate.entity";
import { AppError } from "../../error";
import {
  TAddress,
  TAddressRepo,
  TAddressRequest,
} from "../../interfaces/addresses.interfaces";
import { TCategoryRepo } from "../../interfaces/categories.interfaces";
import {
  TCreateRealEstate,
  TRealEstateRepo,
  TRealEstateRequest,
} from "../../interfaces/realEstate.interfaces";

const createRealEstateService = async (
  data: TRealEstateRequest
): Promise<RealEstate> => {
  const realEstateRepo: TRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const categoryRepo: TCategoryRepo = AppDataSource.getRepository(Category);

  const category: Category | null = await categoryRepo.findOne({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (!data.address.number) {
    data.address.number = null;
  }

  const addressRepo: TAddressRepo = AppDataSource.getRepository(Address);
  const address: Address = addressRepo.create(data.address);
  await addressRepo.save(address);

  const newRealEstate: TCreateRealEstate = {
    address: address,
    category: category!,
    size: data.size,
    value: data.value,
  };

  const realEstate: RealEstate = realEstateRepo.create(newRealEstate);

  await realEstateRepo.save(realEstate);

  return realEstate;
};

export default createRealEstateService;
