import { Router } from "express";
import { userPatchSchema, userSchemaRequest } from "../schemas/users.schemas";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/users.controllers";
import checkIfUserEmailExistMiddleware from "../middlewares/checkIfUserEmailExist.middleware";
import validateBodyMiddleware from "../middlewares/validateBody.middlewares";
import checkIfIsAdminMiddleware from "../middlewares/checkIfIsAdmin.middleware";
import checkIfUserUpdateIsValidMiddleware from "../middlewares/checkIfUserUpdateIsValid.middleware";
import checkIfUserExistMiddleware from "../middlewares/checkIfUserExist.middleware";
import checkIfTokenIsValidMiddleware from "../middlewares/checkIfTokenIsValid.middleware";

const userRouters: Router = Router();

userRouters.post(
  "",
  checkIfUserEmailExistMiddleware,
  validateBodyMiddleware(userSchemaRequest),
  createUserController
);

userRouters.get(
  "",
  checkIfTokenIsValidMiddleware,
  checkIfIsAdminMiddleware,
  getUserController
);

userRouters.patch(
  "/:id",
  checkIfTokenIsValidMiddleware,
  checkIfUserExistMiddleware,
  checkIfUserUpdateIsValidMiddleware,
  validateBodyMiddleware(userPatchSchema),
  updateUserController
);

userRouters.delete(
  "/:id",
  checkIfUserExistMiddleware,
  checkIfTokenIsValidMiddleware,
  checkIfIsAdminMiddleware,
  deleteUserController
);
export default userRouters;
