import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const limit = paginationDto.limit ?? DEFAULT_PAGE_SIZE;
    const page = paginationDto.page ?? 1;
    const count = await this.propertyRepo.count();

    return {
      items: await this.propertyRepo.find({
        skip: (page - 1) * limit,
        take: limit,
      }),
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOne({
      where: {
        id,
      },
    });

    if (!property) throw new NotFoundException();

    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    const property = await this.propertyRepo.findOne({
      where: {
        id,
      },
    });

    if (!property) throw new NotFoundException();

    return await this.propertyRepo.update({ id }, dto);
  }

  async delete(id: number) {
    const property = await this.propertyRepo.findOne({
      where: {
        id,
      },
    });

    if (!property) throw new NotFoundException();

    return await this.propertyRepo.delete(id);
  }
}
