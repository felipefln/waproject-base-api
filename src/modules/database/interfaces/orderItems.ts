import { IOrder } from './order';

interface IOrderItems {
  id?: number;
  orderId: number;
  itemId: number;
  createdDate?: Date;
  updatedDate?: Date;
  orders?: IOrder;
}

export { IOrderItems };
