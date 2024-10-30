// Generated by ts-to-zod
import { z } from 'zod';

export const orderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  status: z.union([z.literal('pending'), z.literal('completed'), z.literal('canceled')]),
});

const productSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  price: z.number(),
});
