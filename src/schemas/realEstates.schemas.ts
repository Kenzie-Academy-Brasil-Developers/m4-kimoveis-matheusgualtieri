import { z } from "zod";
import { addressSchema, addressSchemaRequest } from "./addresses.schemas";
import { categorySchema } from "./categories.schemas";
import { simpleScheduleSchema } from "./schedule.schemas";

const realEstateSchema = z.object({
  id: z.number(),
  value: z.coerce.number().default(0),
  size: z.number().int().positive(),
  address: addressSchemaRequest,
  categoryId: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const realEstateSchemaRequest = realEstateSchema.omit({
  id: true,
  sold: true,
  createdAt: true,
  updatedAt: true,
});

const createRealEstateSchema = z.object({
  value: z.number().default(0),
  size: z.number().int(),
  address: addressSchema,
  category: categorySchema,
});

const realEstateSchemaResponse = z.object({
  id: z.number(),
  value: z.number().default(0),
  size: z.number().int(),
  address: addressSchema,
  category: categorySchema,
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const realEstateArrSchema = z.array(realEstateSchemaResponse);
const simpleRealEstateArrSchema = realEstateSchema.omit({
  categoryId: true,
  address: true,
});

const realEstateScheduleArrSchema = realEstateSchemaResponse.extend({
  schedule: z.array(simpleScheduleSchema),
});

export {
  realEstateSchema,
  realEstateSchemaRequest,
  createRealEstateSchema,
  realEstateSchemaResponse,
  realEstateArrSchema,
  realEstateScheduleArrSchema,
  simpleRealEstateArrSchema,
};
