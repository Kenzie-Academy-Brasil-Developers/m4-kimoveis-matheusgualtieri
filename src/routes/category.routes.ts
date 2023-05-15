import { Router } from "express";
import checkIfIsAdminMiddleware from "../middlewares/checkIfIsAdmin.middleware";
import validateBodyMiddleware from "../middlewares/validateBody.middlewares";
import { categorySchemaRequest } from "../schemas/categories.schemas";
import {
  createCategoryController,
  getCategoriesController,
  getRealEstateByCategoryController,
} from "../controllers/categories.controllers";
import checkIfCategoryNameExistMiddleware from "../middlewares/checkIfCategoryNameExist.middleware";
import checkIfTokenIsValidMiddleware from "../middlewares/checkIfTokenIsValid.middleware";
import checkIfCategoryExistMiddleware from "../middlewares/checkIfCategoryExist.middleware";

const categoryRouters: Router = Router();

categoryRouters.post(
  "",
  checkIfCategoryNameExistMiddleware,
  checkIfTokenIsValidMiddleware,
  checkIfIsAdminMiddleware,
  validateBodyMiddleware(categorySchemaRequest),
  createCategoryController
);

categoryRouters.get("", getCategoriesController);

categoryRouters.get(
  "/:id/realEstate",
  checkIfCategoryExistMiddleware,
  getRealEstateByCategoryController
);
export default categoryRouters;
