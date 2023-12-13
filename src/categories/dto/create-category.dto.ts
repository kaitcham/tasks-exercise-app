import { IsOptional, IsString, Validate } from 'class-validator';
import { UniqueValidator } from '../../tasks/unique-validator';

export class CreateCategoryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @Validate(UniqueValidator, ['categories'], {
    message: 'Category already exists',
  })
  name: string;

  // @IsOptional()
  // @IsString({ each: true })
  // todoIds?: string[];
}
