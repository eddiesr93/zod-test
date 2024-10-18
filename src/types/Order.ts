/**
 * @zod.schema
 */
export type Order = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  status: 'pending' | 'completed' | 'canceled';
};
