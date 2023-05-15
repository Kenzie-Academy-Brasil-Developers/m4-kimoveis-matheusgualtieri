import { Repository } from "typeorm";
import { z } from "zod";
import Address from "../entities/addresses.entity";
import {
  addressSchema,
  addressSchemaRequest,
} from "../schemas/addresses.schemas";

type TAddress = z.infer<typeof addressSchema>;
type TAddressRequest = z.infer<typeof addressSchemaRequest>;
type TAddressRepo = Repository<Address>;

export { TAddressRepo, TAddress, TAddressRequest };
