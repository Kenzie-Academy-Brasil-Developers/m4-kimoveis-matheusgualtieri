import { Router } from "express";
import checkIfTokenIsValidMiddleware from "../middlewares/checkIfTokenIsValid.middleware";
import {
  createScheduleController,
  getSchedulesOfARealEstateController,
} from "../controllers/schedules.controllers";
import validateBodyMiddleware from "../middlewares/validateBody.middlewares";
import { scheduleSchemaRequestBody } from "../schemas/schedule.schemas";
import checkIfIsAdminMiddleware from "../middlewares/checkIfIsAdmin.middleware";

const scheduleRouters: Router = Router();

scheduleRouters.post(
  "",
  checkIfTokenIsValidMiddleware,
  validateBodyMiddleware(scheduleSchemaRequestBody),
  createScheduleController
);

scheduleRouters.get(
  "/realEstate/:id",
  checkIfTokenIsValidMiddleware,
  checkIfIsAdminMiddleware,
  getSchedulesOfARealEstateController
);

export default scheduleRouters;
