import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { AppService } from './app.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { ProductService } from './services/product/product.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UsersController,
    CustomerController,
  ],
  providers: [AppService, ProductService],
})
export class AppModule {}
