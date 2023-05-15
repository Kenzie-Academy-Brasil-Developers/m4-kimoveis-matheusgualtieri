import { z } from "zod";
import {
  userPatchSchema,
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
} from "../schemas/users.schemas";
import { DeepPartial, Repository } from "typeorm";
import User from "../entities/users.entity";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUserPatch = DeepPartial<typeof userPatchSchema>;
type TUserRepo = Repository<User>;

export { TUser, TUserRequest, TUserRepo, TUserResponse, TUserPatch };
