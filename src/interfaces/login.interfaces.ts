import { z } from "zod";
import { loginSchema, tokenSchema } from "../schemas/login.schemas";

type TLogin = z.infer<typeof loginSchema>;
type TToken = z.infer<typeof tokenSchema>;

export { TLogin, TToken };
