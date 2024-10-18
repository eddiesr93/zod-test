/**
 * @zod.schema
 */
export type User = {
  id: number;
  /** @maxLength 42	 */
  name: string;
  email?: string;
  role: 'admin' | 'user';
};
