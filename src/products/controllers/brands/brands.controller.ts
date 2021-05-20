import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BrandService } from '../../services/brand/brand.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
} from '../../dtos/brand.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandService) {}

  @Get()
  getProducts() {
    return this.brandService.findAll();
  }

  @Get('/:id')
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.brandService.delete(id);
  }
}
