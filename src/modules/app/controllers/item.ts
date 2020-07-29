import { ApiResponse, ApiTags } from '@nestjs/swagger';
// import { AuthRequired } from 'modules/common/guards/token';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ITem } from 'modules/database/models/item';
import { ITemRepository } from '../repositories/item';
import { ITemService } from '../services/item';
import { ListValidator } from '../validators/item/List';
import { SaveValidator } from '../validators/item/Save';

@ApiTags('App: ITem')
@Controller('/item')
//@AuthRequired
export class ITemController {
  constructor(private itemRepository: ITemRepository, private itemService: ITemService) {}

  @Get()
  @ApiResponse({ status: 200, type: [ITem] })
  public async list(@Query() model: ListValidator) {
    return this.itemRepository.list(model);
  }

  @Get(':itemId')
  @ApiResponse({ status: 200, type: ITem })
  public async details(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemRepository.findById(itemId);
  }

  @Post()
  @ApiResponse({ status: 200, type: ITem })
  public async save(@Body() model: SaveValidator) {
    return this.itemService.save(model);
  }
}
