import { AppDataSource } from "../../data-source";
import User from "../../entities/users.entity";
import { TUserRepo } from "../../interfaces/user.interfaces";

const deleteUserService = async (id: number) => {
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({ id });
  if (user) {
    await userRepo.softRemove(user);
  }
};

export default deleteUserService;
