import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import validateBodyMiddleware from "../middlewares/validateBody.middlewares";
import { loginSchema } from "../schemas/login.schemas";

const loginRouters: Router = Router();

loginRouters.post(
  "",
  validateBodyMiddleware(loginSchema),
  createLoginController
);

export default loginRouters;
