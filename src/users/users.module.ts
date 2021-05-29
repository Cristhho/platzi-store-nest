import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customer/customer.controller';
import { UserService } from './services/user/user.service';
import { CustomerService } from './services/customer/customer.service';
import { ProductsModule } from '../products/products.module';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderService } from './services/order/order.service';
import { OrderController } from './controllers/order/order.controller';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomersController, OrderController],
  providers: [UserService, CustomerService, OrderService],
  exports: [UserService],
})
export class UsersModule {}
