import { z } from "zod";
import {
  createRealEstateSchema,
  realEstateScheduleArrSchema,
  realEstateSchema,
  realEstateSchemaRequest,
  realEstateSchemaResponse,
} from "../schemas/realEstates.schemas";
import { Repository } from "typeorm";
import RealEstate from "../entities/realEstate.entity";

type TRealEstate = z.infer<typeof realEstateSchemaResponse>;
type TRealEstateRequest = z.infer<typeof realEstateSchemaRequest>;
type TCreateRealEstate = z.infer<typeof createRealEstateSchema>;
type TRealEstateSchedules = z.infer<typeof realEstateScheduleArrSchema>;
type TRealEstateRepo = Repository<RealEstate>;

export {
  TRealEstate,
  TRealEstateRequest,
  TRealEstateRepo,
  TCreateRealEstate,
  TRealEstateSchedules,
};
