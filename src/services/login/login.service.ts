import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { TLogin, TToken } from "../../interfaces/login.interfaces";
import { AppError } from "../../error";
import "dotenv/config";
import { TUserRepo } from "../../interfaces/user.interfaces";
import { AppDataSource } from "../../data-source";
import User from "../../entities/users.entity";

const createLoginService = async (loginData: TLogin): Promise<TToken> => {
  const email = loginData.email;
  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const pwdMatch: boolean = await compare(loginData.password, user.password);

  if (!pwdMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    { admin: user.admin },
    process.env.SECRET_KEY!,
    { expiresIn: "1d", subject: String(user.id) }
  );

  return { token };
};

export default createLoginService;
