import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customer/customer.controller';
import { UserService } from './services/user/user.service';
import { CustomerService } from './services/customer/customer.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CustomersController],
  providers: [UserService, CustomerService],
})
export class UsersModule {}
