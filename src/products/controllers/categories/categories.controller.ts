import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/:categoryId/products/:productId')
  getCategoryProduct(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `Product ${productId} in category ${categoryId}`;
  }
}
