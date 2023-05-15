import { AppDataSource } from "../../data-source";
import User from "../../entities/users.entity";
import {
  TUserRepo,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/user.interfaces";
import { userSchemaResponse } from "../../schemas/users.schemas";

const createUserService = async (
  data: TUserRequest
): Promise<TUserResponse> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: User = userRepo.create(data);

  await userRepo.save(user);

  return userSchemaResponse.parse(user);
};

export default createUserService;
