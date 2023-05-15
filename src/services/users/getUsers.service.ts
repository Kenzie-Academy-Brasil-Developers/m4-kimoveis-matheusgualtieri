import User from "../../entities/users.entity";
import { TUserRepo, TUserResponse } from "../../interfaces/user.interfaces";
import { userArrSchemaResponse } from "../../schemas/users.schemas";
import { AppDataSource } from "../../data-source";

const getUsersService = async (): Promise<TUserResponse[]> => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const allUsers: Array<User> = await userRepo.find();

  return userArrSchemaResponse.parse(allUsers);
};

export default getUsersService;
