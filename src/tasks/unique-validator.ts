import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DatabaseService } from '../database.service';

@ValidatorConstraint({ async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly databaseService: DatabaseService) {}

  async validate(value: any, args: ValidationArguments) {
    const [entityType] = args.constraints;
    const exists = await this.databaseService.exists(entityType, value);
    return !exists;
  }
}
