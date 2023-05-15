import { z } from "zod";
import { userSchema } from "./users.schemas";
import { realEstateSchemaResponse } from "./realEstates.schemas";

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().int(),
  userId: z.number().int(),
});

const scheduleSchemaRequest = scheduleSchema.omit({ id: true });
const scheduleSchemaRequestBody = scheduleSchemaRequest.omit({ userId: true });

const scheduleSchemaResponse = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstate: realEstateSchemaResponse,
  user: userSchema,
});

const createScheduleSchema = scheduleSchemaResponse.omit({ id: true });

const simpleScheduleSchema = scheduleSchema.omit({
  id: true,
  realEstateId: true,
  userId: true,
});

export {
  scheduleSchema,
  scheduleSchemaRequest,
  scheduleSchemaResponse,
  createScheduleSchema,
  simpleScheduleSchema,
  scheduleSchemaRequestBody,
};
