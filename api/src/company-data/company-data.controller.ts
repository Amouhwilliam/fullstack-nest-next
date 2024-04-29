import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
  Param,
    Delete,
    Query, UseInterceptors,
} from '@nestjs/common';
import { CompanyDataService } from './company-data.service';
import { CreateCompanyDataDto } from './dto/create-company-data.dto';
import { UpdateCompanyDataDto } from './dto/update-company-data.dto';
import { ListAllDto } from './dto/list-company-data.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('company-data')
export class CompanyDataController {
  constructor(private readonly companyDataService: CompanyDataService) {}

  @Post()
  @ApiOperation({ summary: 'Add data' })
  @ApiBody({ type: CreateCompanyDataDto })
  @ApiResponse({ description: 'Data add successfully' })
  async create(@Body() createCompanyDatumDto: CreateCompanyDataDto) {
    return await this.companyDataService.create(createCompanyDatumDto);
  }

  @Get()
  @ApiResponse({
    description: 'The found record',
    type: CompanyDataService,
  })
  async findAll(@Query() query: ListAllDto) {
    return await this.companyDataService.findAll({
      search: query.search,
      parentId: query.parentId,
      pagination: query.pagination,
    });
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30) // override TTL to 30 seconds
  @Get(':id')
  @ApiResponse({
    description: 'The found record',
    type: CompanyDataService,
  })
  async findOne(@Param('id') id: string) {
    return await this.companyDataService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCompanyDataDto })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDatumDto: UpdateCompanyDataDto,
  ) {
    return await this.companyDataService.update(+id, updateCompanyDatumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companyDataService.remove(+id);
  }
}
