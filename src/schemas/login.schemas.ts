import { z } from "zod";

const loginSchema = z.object({
  email: z.string().max(45).email(),
  password: z.string().max(120),
});

const tokenSchema = z.object({
  token: z.string(),
});

export { tokenSchema, loginSchema };
