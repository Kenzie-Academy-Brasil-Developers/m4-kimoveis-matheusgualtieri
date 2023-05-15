import { z } from "zod";
import {
  createScheduleSchema,
  scheduleSchema,
  scheduleSchemaRequest,
  scheduleSchemaResponse,
} from "../schemas/schedule.schemas";
import { Repository } from "typeorm";
import Schedule from "../entities/schedules.entity";

type TScheduleResponse = z.infer<typeof scheduleSchemaResponse>;
type TSchedule = z.infer<typeof scheduleSchema>;
type TScheduleRequest = z.infer<typeof scheduleSchemaRequest>;
type TCreateSchedule = z.infer<typeof createScheduleSchema>;
type TScheduleRepo = Repository<Schedule>;

export {
  TSchedule,
  TScheduleRepo,
  TScheduleRequest,
  TScheduleResponse,
  TCreateSchedule,
};
