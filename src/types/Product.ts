/**
 * @zod.schema
 */
export type Product = {
  id?: number;
  /**
   * @minLength 2
   * @maxLength 50
   */
  name: string;
  price: number;
};
