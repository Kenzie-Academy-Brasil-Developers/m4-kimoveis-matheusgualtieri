import { NextFunction, Request, Response } from "express";
import {
  TAddressRepo,
  TAddressRequest,
} from "../interfaces/addresses.interfaces";
import Address from "../entities/addresses.entity";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const checkIfRealEstateAddressExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { city, state, street, zipCode, number }: TAddressRequest =
    req.body.address;
  const addressRepo: TAddressRepo = AppDataSource.getRepository(Address);
  if (number) {
    const addresValid: Address | null = await addressRepo
      .createQueryBuilder("address")
      .select()
      .where("address.street = :street", {
        street,
      })
      .andWhere("address.zipCode = :zipCode", { zipCode })
      .andWhere("address.city= :city", { city })
      .andWhere("address.state = :state", { state })
      .andWhere("address.number = :number", { number })
      .getOne();
    if (addresValid) {
      throw new AppError("Address already exists", 409);
    }
  } else {
    const addresValid: Address | null = await addressRepo
      .createQueryBuilder("address")
      .select()
      .where("address.street = :street", {
        street,
      })
      .andWhere("address.zipCode = :zipCode", { zipCode })
      .andWhere("address.city= :city", { city })
      .andWhere("address.state = :state", { state })
      .getOne();

    if (addresValid) {
      throw new AppError("Address already exists", 409);
    }
  }

  return next();
};

export default checkIfRealEstateAddressExistMiddleware;
