import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductService } from './services/product/product.service';
import { CategoryService } from './services/category/category.service';
import { Product, ProductSchema } from './entities/product.entity';
import { Brand, BrandSchema } from './entities/brand.entity';
import { BrandsController } from './controllers/brands/brands.controller';
import { BrandService } from './services/brand/brand.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductService, CategoryService, BrandService],
  exports: [ProductService],
})
export class ProductsModule {}
