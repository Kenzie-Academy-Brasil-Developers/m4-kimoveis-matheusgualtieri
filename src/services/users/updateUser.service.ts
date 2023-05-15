import { AppDataSource } from "../../data-source";
import User from "../../entities/users.entity";
import {
  TUserPatch,
  TUserRepo,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { userSchemaResponse } from "../../schemas/users.schemas";

const updateUserService = async (
  data: TUserPatch,
  id: number
): Promise<TUserResponse> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({ id });

  const updateUser: User = userRepo.create({ ...user, ...data });

  await userRepo.save(updateUser);

  return userSchemaResponse.parse(updateUser);
};

export default updateUserService;
