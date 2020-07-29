import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrderItems } from '../interfaces/orderItems';
import { ITem } from './item';
import { Order } from './order';

export class OrderItems extends Model implements IOrderItems {
  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'integer' })
  public orderId: number;

  @ApiProperty({ type: 'integer' })
  public itemId: number;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  @ApiProperty({ nullable: true })
  public items?: ITem[];
  public order?: Order[];

  public static get tableName(): string {
    return 'OrderItems';
  }

  public static get relationMappings(): any {
    return {
      items: {
        relation: Model.HasOneRelation,
        modelClass: ITem,
        filter: (query: any) => query.select('id', 'price', 'description'),
        join: {
          from: 'Item.id',
          to: 'OrderItems.itemId'
        }
      },
      order: {
        relation: Model.HasOneRelation,
        modelClass: Order,
        filter: (query: any) => query.select('id', 'dateOrder'),
        join: {
          from: 'Order.id',
          to: 'OrderedItem.orderId'
        }
      }
    };
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
  public $formatJson(data: IOrderItems): IOrderItems {
    return data;
  }
}
