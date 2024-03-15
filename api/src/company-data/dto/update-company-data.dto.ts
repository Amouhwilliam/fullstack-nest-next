import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDataDto } from './create-company-data.dto';

export class UpdateCompanyDataDto extends PartialType(CreateCompanyDataDto) {}
