import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IItem } from 'modules/database/interfaces/item';

export class SaveValidator implements IItem {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: 'interger', required: false })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({ type: 'string', required: true, minLength: 3, maxLength: 60 })
  public description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: true })
  public price: string;
}
