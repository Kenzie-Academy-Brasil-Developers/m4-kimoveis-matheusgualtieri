import { z } from "zod";
import { simpleRealEstateArrSchema } from "./realEstates.schemas";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const categorySchemaRequest = categorySchema.omit({ id: true });
const categoriesArrSchema = z.array(categorySchema);
const realEstateByCategorySchema = categorySchema.extend({
  realEstate: z.array(simpleRealEstateArrSchema),
});

export {
  categorySchema,
  categorySchemaRequest,
  categoriesArrSchema,
  realEstateByCategorySchema,
};
