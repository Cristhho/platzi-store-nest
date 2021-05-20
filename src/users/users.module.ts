import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customer/customer.controller';
import { UserService } from './services/user/user.service';
import { CustomerService } from './services/customer/customer.service';
import { ProductsModule } from '../products/products.module';
import { Customer, CustomerSchema } from './entities/customer.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController],
  providers: [UserService, CustomerService],
})
export class UsersModule {}
