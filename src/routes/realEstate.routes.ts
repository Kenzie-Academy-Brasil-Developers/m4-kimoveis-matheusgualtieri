import { Router } from "express";
import checkIfTokenIsValidMiddleware from "../middlewares/checkIfTokenIsValid.middleware";
import checkIfIsAdminMiddleware from "../middlewares/checkIfIsAdmin.middleware";
import checkIfRealEstateAddressExistMiddleware from "../middlewares/checkIfRealEstateAddressExist.middleware";
import checkIfCategoryExistMiddleware from "../middlewares/checkIfCategoryExist.middleware";
import {
  createRealEstateController,
  getRealEstatesController,
} from "../controllers/realEstate.controllers";
import validateBodyMiddleware from "../middlewares/validateBody.middlewares";
import { realEstateSchemaRequest } from "../schemas/realEstates.schemas";

const realEstateRouters: Router = Router();

realEstateRouters.post(
  "",
  checkIfTokenIsValidMiddleware,
  checkIfIsAdminMiddleware,
  validateBodyMiddleware(realEstateSchemaRequest),
  checkIfRealEstateAddressExistMiddleware,
  createRealEstateController
);

realEstateRouters.get("", getRealEstatesController);

export default realEstateRouters;
