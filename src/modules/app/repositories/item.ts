import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IItem } from 'modules/database/interfaces/Item';
import { ITem } from 'modules/database/models/item';
import { Page, Transaction } from 'objection';

@Injectable()
export class ITemRepository {
  public async findById(id: number, transaction?: Transaction): Promise<ITem> {
    return ITem.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IItem, transaction?: Transaction): Promise<ITem> {
    return ITem.query(transaction).insert(model);
  }

  public async update(model: IItem, transaction?: Transaction): Promise<ITem> {
    return ITem.query(transaction).updateAndFetchById(model.id, <ITem>model);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<ITem>> {
    let query = ITem.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }
    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await ITem.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findByDescription(description: string, transaction?: Transaction): Promise<ITem> {
    return ITem.query(transaction)
      .where({ description })
      .first();
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await ITem.query(transaction)
      .del()
      .where({ id });
  }
}
