import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.propertyService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertyService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.delete(id);
  }
}
