import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IItem } from 'modules/database/interfaces/item';
import { ITem } from 'modules/database/models/item';

import { ITemRepository } from '../repositories/item';

@Injectable()
export class ITemService {
  constructor(private itemRepository: ITemRepository) {}

  public async save(model: IItem): Promise<ITem> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(itemId: number, currentItem: IItem): Promise<void> {
    const item = await this.itemRepository.findById(itemId);

    if (!item) {
      throw new NotFoundException('not-found');
    }

    if (item.id === currentItem.id) {
      throw new BadRequestException('not-allowed-remove-item');
    }

    return this.itemRepository.remove(itemId);
  }

  private async create(model: IItem): Promise<ITem> {
    const item = await this.itemRepository.insert(model);
    return item;
  }

  private async update(model: IItem): Promise<ITem> {
    const item = await this.itemRepository.findById(model.id);
    if (!item) throw new NotFoundException('not-found');

    return this.itemRepository.update({ ...item, ...model });
  }
}
