import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';
import { IItem } from '../interfaces/item';

export class ITem extends Model implements IItem {
  @ApiProperty({ type: 'integer' })
  public id: number;

  @ApiProperty({ type: 'string' })
  public price: string;

  @ApiProperty({ type: 'string' })
  public description: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Item';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }
  public $formatJson(data: IItem): IItem {
    return data;
  }
}
