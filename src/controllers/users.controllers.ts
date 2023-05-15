import { Request, Response } from "express";
import {
  TUser,
  TUserRequest,
  TUserResponse,
} from "../interfaces/user.interfaces";
import createUserService from "../services/users/createUser.service";
import getUsersService from "../services/users/getUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TUserRequest = req.body;
  const newUser: TUserResponse = await createUserService(data);
  return res.status(201).json(newUser);
};

const getUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allUsers: Array<TUserResponse> = await getUsersService();
  return res.status(200).json(allUsers);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const data = req.body;
  const updatedUser: TUserResponse = await updateUserService(data, id);
  return res.status(200).json(updatedUser);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  await deleteUserService(id);

  return res.status(204).send();
};

export {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
};
