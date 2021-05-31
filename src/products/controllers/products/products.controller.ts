import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductService } from '../../services/product/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../../dtos/product.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decorators/public.decorator';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/models/roles.model';

@ApiTags('products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Shows a list of products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Public()
  @Get('/filter')
  getProductFilter() {
    return {
      message: 'this is the filter',
    };
  }

  @Public()
  @Get('/:productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productService.delete(id);
  }
}
