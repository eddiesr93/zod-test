// Generated by ts-to-zod
import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});
