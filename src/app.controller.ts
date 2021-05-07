import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 10,
    @Query('brand') brand: string,
  ) {
    return `products: limit: ${limit}, offset: ${offset}, brand: ${brand}`;
  }

  @Get('products/filter')
  getProductFilter() {
    return 'this is the filter';
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `Product ${productId}`;
  }

  @Get('categories/:categoryId/products/:productId')
  getCategoryProduct(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `Product ${productId} in category ${categoryId}`;
  }
}
