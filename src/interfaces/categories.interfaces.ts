import { z } from "zod";
import {
  categorySchema,
  categorySchemaRequest,
} from "../schemas/categories.schemas";
import { Repository } from "typeorm";
import Category from "../entities/categories.entity";

type TCategory = z.infer<typeof categorySchema>;
type TCategoryRequest = z.infer<typeof categorySchemaRequest>;
type TCategoryRepo = Repository<Category>;

export { TCategory, TCategoryRequest, TCategoryRepo };
