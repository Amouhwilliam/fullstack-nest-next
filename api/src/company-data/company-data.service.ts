import {Injectable} from '@nestjs/common';
import {CreateCompanyDataDto} from './dto/create-company-data.dto';
import {UpdateCompanyDataDto} from './dto/update-company-data.dto';
import {PrismaService} from "../prisma/prisma.service";
import {Controller, Get, Post, Body, Param} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';


@Injectable()
export class CompanyDataService {

    constructor(private prisma: PrismaService) {
    }

    async create(createCompanyDataDto: CreateCompanyDataDto) {
        try {
            const data = await this.prisma.companyData.create({
                data: createCompanyDataDto,
            });

            return {
                statusCode: 200,
                data
            };
        } catch (error) {
            console.log(error)
            return {
              status: 500,
              error
            }
        }
    }

    async findAll({search, parentId, pagination}) {
        try {
            let query = []
            if(!search && +parentId){
                query.push({ parentId: +parentId})
            } else if(search && +parentId) {
                query.push({ name: { contains: search } })
                query.push({ parentId: +parentId})
            } else if(search){
                query.push({ name: { contains: search } })
            } else if(!search && !+parentId){
                query.push({ parentId: null})
            }
            console.log(query)
            const results = await this.prisma.companyData.findMany({
                where: {
                    AND:  query
                },
                orderBy: {
                    id: "desc",
                },
            })

            return {
                statusCode: 200,
                data: results
            };
        } catch (error) {
          console.log(error)
          return {
            statusCode: 500,
            error
          }
        }
    }

    async findOne(id: number) {
        try {
            const data = await this.prisma.companyData.findUnique({
                where: {
                    id
                }
            })
            return {
                statusCode: 200,
                data
            };
        } catch (error) {
          console.log(error)
          return {
            statusCode: 500,
            error
          }
        }
    }

    async update(id: number, updateCompanyDatumDto: UpdateCompanyDataDto) {
        try {
            const data = await this.prisma.companyData.update({
                where: {
                    id
                },
                data: updateCompanyDatumDto
            })

            return {
                statusCode: 200,
                data
            };
        } catch (error) {
          console.log(error)
          return {
            statusCode: 500,
            error
          }
        }
    }

    async remove(id: number) {
        try {
            const deletedDocument = this.prisma.companyData.delete({
                where: {
                    id
                }
            })
            const deletedDocuments= this.prisma.companyData.deleteMany({
                where: {
                    parentId:id
                }
            })
            const transaction = await this.prisma.$transaction([deletedDocuments, deletedDocument])
            return {
                statusCode: 200,
                data: transaction[1]
            };

        } catch (error) {
          console.log(error)
          return {
            statusCode: 500,
            error
          }
        }
    }
}
