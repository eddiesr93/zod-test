export type Order = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  status: 'pending' | 'completed' | 'canceled';
};

type Product = {
  id?: number;
  name: string;
  price: number;
};

const a = 1;
