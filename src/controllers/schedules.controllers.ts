import { Request, Response } from "express";
import { TScheduleRequest } from "../interfaces/schedule.interfaces";
import createScheduleService from "../services/schedules/createSchedule.service";
import getSchedulesOfARealEstateService from "../services/schedules/getSchedulesOfARealEstate.service";
import { RealEstate, Schedule } from "../entities";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data: TScheduleRequest = { ...req.body, userId: res.locals.token.id };
  const newSchedule: Schedule = await createScheduleService(data);
  return res.status(201).json({ message: "Schedule created" });
};

const getSchedulesOfARealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);
  const realEstate: RealEstate = await getSchedulesOfARealEstateService(id);
  return res.status(200).json(realEstate);
};

export { createScheduleController, getSchedulesOfARealEstateController };
