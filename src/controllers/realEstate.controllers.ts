import { Request, Response } from "express";
import {
  TRealEstate,
  TRealEstateRequest,
} from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import getRealEstatesService from "../services/realEstate/getRealEstate.service";
import { RealEstate } from "../entities";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let data: TRealEstateRequest = req.body;
  const newRealEstate: RealEstate = await createRealEstateService(data);
  return res.status(201).json(newRealEstate);
};

const getRealEstatesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newRealEstate: Array<RealEstate> = await getRealEstatesService();
  return res.status(200).json(newRealEstate);
};

export { createRealEstateController, getRealEstatesController };
