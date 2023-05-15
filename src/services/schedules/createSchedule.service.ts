import { AppDataSource } from "../../data-source";
import RealEstate from "../../entities/realEstate.entity";
import Schedule from "../../entities/schedules.entity";
import User from "../../entities/users.entity";
import { AppError } from "../../error";
import { TRealEstateRepo } from "../../interfaces/realEstate.interfaces";
import {
  TScheduleRepo,
  TScheduleRequest,
} from "../../interfaces/schedule.interfaces";
import { TUserRepo } from "../../interfaces/user.interfaces";

const createScheduleService = async (
  data: TScheduleRequest
): Promise<Schedule> => {
  const realEstateRepo: TRealEstateRepo =
    AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: data.realEstateId,
    },
    relations: {
      address: true,
      category: true,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const scheduleRepo: TScheduleRepo = AppDataSource.getRepository(Schedule);

  const date: string[] = data.date.split("/");
  const time: string[] = data.hour.split(":");

  if (
    date[0].length != 4 ||
    date[1].length != 2 ||
    date[2].length != 2 ||
    Number(date[1]) > 31 ||
    Number(date[2]) > 12
  ) {
    throw new AppError("Invalid Date", 400);
  }
  if (
    time[0].length > 2 ||
    time[1].length > 2 ||
    Number(time[0]) > 24 ||
    Number(time[1]) > 60
  ) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }
  if (Number(time[0]) < 8 || Number(time[0]) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  } else if (Number(time[0]) === 18 && Number(time[1]) > 0) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const scheduleDate = data.date;
  const scheduleHour = data.hour;
  const userId = data.userId;
  const realEstateId = data.realEstateId;

  const userSchedules: Schedule[] = await scheduleRepo
    .createQueryBuilder("schedule")
    .select()
    .where("schedule.userId = :userId", {
      userId,
    })
    .andWhere("schedule.date = :scheduleDate", { scheduleDate })
    .andWhere("schedule.hour = :scheduleHour", { scheduleHour })
    .getMany();

  const realStateSchedules: Schedule[] = await scheduleRepo
    .createQueryBuilder("schedule")
    .select()
    .where("schedule.realEstateId = :realEstateId", {
      realEstateId,
    })
    .andWhere("schedule.date = :scheduleDate", { scheduleDate })
    .andWhere("schedule.hour = :scheduleHour", { scheduleHour })
    .getMany();

  if (userSchedules.length > 0) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (realStateSchedules.length > 0) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const dayOfTheWeek = new Date(`
    ${Number(date[0])}-
    ${Number(date[2])}-
    ${Number(date[1])}`).getDay();
  console.log(dayOfTheWeek);
  if (dayOfTheWeek === 0 || dayOfTheWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const userRepo: TUserRepo = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOne({
    where: {
      id: data.userId,
    },
  });

  const newSchedule: Schedule = scheduleRepo.create({
    date: data.date,
    hour: data.hour,
    realEstate: realEstate,
    user: user!,
  });
  await scheduleRepo.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
