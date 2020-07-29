import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/Order';
import { OrderItems } from './orderItems';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'string' })
  public dateOrder: Date;

  @ApiProperty({ type: 'integer' })
  public userId: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public orderItems: OrderItems;

  public static get tableName(): string {
    return 'Order';
  }

  public static get relationMappings(): any {
    return {
      orderItem: {
        relation: Model.HasManyRelation,
        modelClass: OrderItems,
        join: {
          from: 'Order.id',
          to: 'orderItems.orderId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.dateOrder = this.updatedDate = new Date();
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
