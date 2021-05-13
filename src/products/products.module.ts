import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductService, CategoryService],
  exports: [ProductService],
})
export class ProductsModule {}
