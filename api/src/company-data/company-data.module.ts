import { Module } from '@nestjs/common';
import { CompanyDataService } from './company-data.service';
import { CompanyDataController } from './company-data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports:  [PrismaModule],
  controllers: [CompanyDataController],
  providers: [CompanyDataService],
})
export class CompanyDataModule {}
