// Generated by ts-to-zod
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(42),
  email: z.string().optional(),
  phone: z.string().phone(),
  role: z.union([z.literal("admin"), z.literal("user")]),
});
